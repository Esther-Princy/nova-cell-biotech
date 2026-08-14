import type { Transition, Variants } from 'framer-motion'

/** Gentle spring for interactive elements (buttons, cards) */
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
}

/** Snappy spring for micro-interactions (toggles, taps) */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

/** Bouncy spring for playful emphasis (stat counters, badges) */
export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}

/** Smooth tween for section reveals */
export const tweenSmooth: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

/** Fast tween for hover states and micro-interactions */
export const tweenFast: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
}

/** Slow tween for ambient / background animations */
export const tweenSlow: Transition = {
  duration: 0.8,
  ease: [0.45, 0, 0.55, 1],
}

/** SVG path draw animation */
export const tweenDraw: Transition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
}

/** Instant transition for reduced-motion fallback */
export const instant: Transition = {
  duration: 0,
}

/** Default viewport margin for scroll-triggered animations */
export const defaultViewportMargin = '-80px'

/** Standard whileInView viewport config */
export const defaultViewport = {
  once: true,
  margin: defaultViewportMargin,
} as const

/** Stagger timing presets */
export const staggerTiming = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
} as const

/** Delay presets for sequenced reveals */
export const delayPresets = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
} as const

/** Returns a reduced-motion-safe transition */
export function getTransition(
  transition: Transition,
  prefersReducedMotion: boolean,
): Transition {
  return prefersReducedMotion ? instant : transition
}

/** Returns variants with motion disabled when reduced motion is preferred */
export function getVariants(
  variants: Variants,
  prefersReducedMotion: boolean,
): Variants {
  if (!prefersReducedMotion) return variants

  const reduced: Variants = {}
  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === 'object' && value !== null) {
      reduced[key] = {
        ...value,
        transition: instant,
        ...(key === 'hidden' ? { opacity: 0 } : { opacity: 1 }),
        x: 0,
        y: 0,
        scale: 1,
      }
    }
  }
  return reduced
}
