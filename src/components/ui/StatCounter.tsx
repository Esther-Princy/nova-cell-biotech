import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { statReveal } from '../../animations/variants'
import { useMotionSafe } from '../../animations/useMotionSafe'
import {
  formatStatValue,
  getDecimalPlaces,
  useCountUp,
} from '../../hooks/useCountUp'
import { cn } from '../../utils/cn'

interface StatCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  description?: string
  /** Override auto-detected decimal precision */
  decimals?: number
  /** Count-up duration in milliseconds */
  duration?: number
  className?: string
}

export default function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  description,
  decimals,
  duration = 1800,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { variants, shouldAnimate, viewport } = useMotionSafe()
  const isInView = useInView(ref, viewport)

  const precision = decimals ?? getDecimalPlaces(value)
  const animatedValue = useCountUp({
    end: value,
    duration,
    enabled: shouldAnimate && isInView,
    decimals: precision,
  })

  const displayValue = shouldAnimate
    ? formatStatValue(animatedValue, precision)
    : formatStatValue(value, precision)

  const accessibleValue = `${prefix}${formatStatValue(value, precision)}${suffix}`

  return (
    <m.div
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      variants={variants(statReveal)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      role="group"
      aria-label={`${accessibleValue} ${label}`}
    >
      <p
        aria-hidden="true"
        className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl"
      >
        {prefix}
        {displayValue}
        {suffix}
      </p>

      <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-text-primary">
        {label}
      </p>

      {description && (
        <p className="text-sm text-text-muted text-pretty">{description}</p>
      )}

      {/* Screen readers receive the final value immediately */}
      <span className="sr-only">
        {accessibleValue} {label}
        {description ? `. ${description}` : ''}
      </span>
    </m.div>
  )
}
