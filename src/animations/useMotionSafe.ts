import { useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import type { Variants } from 'framer-motion'
import { getTransition, getVariants, instant } from './transitions'

/**
 * Central hook for motion-safe animation behavior.
 * Returns helpers that automatically respect prefers-reduced-motion.
 */
export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion() ?? false

  return useMemo(
    () => ({
      prefersReducedMotion,

      /** Safe transition — returns instant when reduced motion is preferred */
      transition: (t: Parameters<typeof getTransition>[0]) =>
        getTransition(t, prefersReducedMotion),

      /** Safe variants — strips transforms when reduced motion is preferred */
      variants: (v: Variants) => getVariants(v, prefersReducedMotion),

      /** Whether infinite/ambient animations should run */
      shouldAnimate: !prefersReducedMotion,

      /** Instant transition for reduced-motion fallback */
      instant,

      /** Standard whileInView viewport — disables margin animation tricks when reduced */
      viewport: prefersReducedMotion
        ? { once: true, amount: 0.1 as const }
        : { once: true, margin: '-80px' as const },
    }),
    [prefersReducedMotion],
  )
}

export default useMotionSafe
