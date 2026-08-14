import { m } from 'framer-motion'
import { useMotionSafe } from '../../animations/useMotionSafe'
import type { NetworkParticle } from './types'

interface MolecularParticlesProps {
  particles: NetworkParticle[]
  paths: Map<string, string>
}

export default function MolecularParticles({
  particles,
  paths,
}: MolecularParticlesProps) {
  const { shouldAnimate } = useMotionSafe()

  if (!shouldAnimate) return null

  return (
    <g aria-hidden="true">
      {particles.map((particle) => {
        const pathD = paths.get(particle.connectionId)
        if (!pathD) return null

        return (
          <g key={particle.id}>
            <m.circle
              r={2}
              fill="#00d4aa"
              style={{
                offsetPath: `path('${pathD}')`,
                offsetRotate: '0deg',
              }}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{
                offsetDistance: ['0%', '100%'],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.05, 0.92, 1],
              }}
            />
          </g>
        )
      })}
    </g>
  )
}
