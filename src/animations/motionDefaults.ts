import { domAnimation } from 'framer-motion'

/** Re-export LazyMotion feature bundle for tree-shaking */
export { domAnimation }

/** Default MotionConfig props applied at the app root */
export const defaultMotionConfig = {
  reducedMotion: 'user' as const,
  transition: {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
}

/** Standard props for scroll-triggered section reveals */
export const scrollRevealProps = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
}

/** Props for elements that animate on mount (hero, navbar) */
export const mountRevealProps = {
  initial: 'hidden' as const,
  animate: 'visible' as const,
}

/** Props for hover-interactive elements */
export const interactiveProps = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 },
}
