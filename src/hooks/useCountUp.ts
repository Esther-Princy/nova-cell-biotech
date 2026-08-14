import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  /** Target value to count toward */
  end: number
  /** Animation duration in milliseconds */
  duration?: number
  /** Whether the animation should run */
  enabled?: boolean
  /** Decimal places to preserve */
  decimals?: number
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - 2 ** (-10 * t)
}

/**
 * Animates a number from zero to `end` when `enabled` becomes true.
 * Returns the final value immediately when disabled (reduced motion).
 */
export function useCountUp({
  end,
  duration = 1800,
  enabled = true,
  decimals = 0,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(enabled ? 0 : end)
  const frameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setValue(end)
      return
    }

    setValue(0)
    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = eased * end

      setValue(Number(current.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [end, duration, enabled, decimals])

  return value
}

/** Derive decimal places from a numeric value */
export function getDecimalPlaces(value: number): number {
  const parts = String(value).split('.')
  return parts[1]?.length ?? 0
}

/** Format a stat value for display */
export function formatStatValue(value: number, decimals: number): string {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))
}
