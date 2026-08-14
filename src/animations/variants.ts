import type { Variants } from 'framer-motion'
import { delayPresets, staggerTiming, tweenDraw, tweenSmooth } from './transitions'

/** Fade in from below — primary section reveal */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenSmooth,
  },
}

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: tweenSmooth,
  },
}

/** Scale in with fade — cards, badges */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: tweenSmooth,
  },
}

/** Slide from left — editorial split layouts */
export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenSmooth,
  },
}

/** Slide from right — editorial split layouts */
export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenSmooth,
  },
}

/** Stagger container — wraps lists and grids */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTiming.normal,
      delayChildren: delayPresets.short,
    },
  },
}

/** Stagger item — child of staggerContainer */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenSmooth,
  },
}

/** Fast stagger container — nav items, small lists */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTiming.fast,
      delayChildren: delayPresets.none,
    },
  },
}

/** SVG path draw — helix strands, network connections */
export const drawPath: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: tweenDraw,
  },
}

/** Continuous float — particle fields, ambient nodes */
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/** Pulse glow — accent nodes, active indicators */
export const pulseGlow: Variants = {
  initial: { opacity: 0.4, scale: 1 },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/** Navbar entrance from top */
export const navReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Hero choreographed entrance container */
export const heroSequence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

/** Hero sequence step — editorial fade-up */
export const heroSequenceItem: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Hero headline container — line-by-line stagger */
export const heroHeadlineContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
}

/** Hero headline line — masked editorial reveal */
export const heroHeadlineLine: Variants = {
  hidden: {
    opacity: 0,
    y: '110%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Hero molecular visual entrance */
export const heroVisualReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    x: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Hero headline word stagger */
export const heroTextContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

export const heroTextItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Card hover lift — applied via whileHover */
export const cardHover = {
  y: -4,
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
}

/** Button tap feedback */
export const buttonTap = {
  scale: 0.98,
}

/** Button hover scale */
export const buttonHover = {
  scale: 1.02,
}

/** Exit fade for mobile menu overlays */
export const fadeOut: Variants = {
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

/** Mobile menu slide */
export const menuSlide: Variants = {
  hidden: {
    opacity: 0,
    x: '100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.2 },
  },
}

/** Stat counter reveal */
export const statReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** CTA section background glow pulse */
export const ctaGlow: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/** Reduced-motion-safe static visible state */
export const staticVisible: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}
