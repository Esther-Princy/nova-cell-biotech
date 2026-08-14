import { LazyMotion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'
import { defaultMotionConfig, domAnimation } from './motionDefaults'

interface MotionProviderProps {
  children: ReactNode
}

/**
 * Wraps the app with LazyMotion (domAnimation only) and global MotionConfig.
 * Respects the user's prefers-reduced-motion setting automatically.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={defaultMotionConfig.reducedMotion}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
