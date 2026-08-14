import { useMotionValue } from 'framer-motion'
import { useCallback, useRef, type PointerEvent } from 'react'

const CENTER = 0.5
const PARALLAX_STRENGTH = 12

interface PointerNetworkState {
  pointerX: ReturnType<typeof useMotionValue<number>>
  pointerY: ReturnType<typeof useMotionValue<number>>
  parallaxX: ReturnType<typeof useMotionValue<number>>
  parallaxY: ReturnType<typeof useMotionValue<number>>
  handlePointerMove: (event: PointerEvent<SVGElement | HTMLDivElement>) => void
  handlePointerLeave: () => void
  isActive: ReturnType<typeof useMotionValue<number>>
}

/**
 * Tracks pointer position as normalized 0–1 values using MotionValues
 * to avoid React re-renders on every mousemove.
 */
export function usePointerNetwork(enabled: boolean): PointerNetworkState {
  const pointerX = useMotionValue(CENTER)
  const pointerY = useMotionValue(CENTER)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const isActive = useMotionValue(0)
  const boundsRef = useRef<DOMRect | null>(null)

  const handlePointerMove = useCallback(
    (event: PointerEvent<SVGElement | HTMLDivElement>) => {
      if (!enabled) return

      const target = event.currentTarget as Element
      boundsRef.current = target.getBoundingClientRect()
      const bounds = boundsRef.current

      const nx = (event.clientX - bounds.left) / bounds.width
      const ny = (event.clientY - bounds.top) / bounds.height

      pointerX.set(nx)
      pointerY.set(ny)
      parallaxX.set((nx - CENTER) * PARALLAX_STRENGTH)
      parallaxY.set((ny - CENTER) * PARALLAX_STRENGTH)
      isActive.set(1)
    },
    [enabled, pointerX, pointerY, parallaxX, parallaxY, isActive],
  )

  const handlePointerLeave = useCallback(() => {
    pointerX.set(CENTER)
    pointerY.set(CENTER)
    parallaxX.set(0)
    parallaxY.set(0)
    isActive.set(0)
  }, [pointerX, pointerY, parallaxX, parallaxY, isActive])

  return {
    pointerX,
    pointerY,
    parallaxX,
    parallaxY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  }
}

/** Normalized viewBox dimensions for proximity calculations */
export const VIEWBOX_SIZE = { width: 480, height: 480 }

/** Maximum proximity radius in normalized coordinates */
export const PROXIMITY_RADIUS = 120
