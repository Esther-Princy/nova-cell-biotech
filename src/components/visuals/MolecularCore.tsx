import { m } from 'framer-motion'
import { useMotionSafe } from '../../animations/useMotionSafe'

interface MolecularCoreProps {
  x: number
  y: number
}

export default function MolecularCore({ x, y }: MolecularCoreProps) {
  const { shouldAnimate, variants } = useMotionSafe()

  const revealVariants = variants({
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  })

  return (
    <g transform={`translate(${x}, ${y})`} aria-hidden="true">
      {/* Outer membrane — organic asymmetric boundary */}
      <m.path
        d="M 0,-28 C 18,-26 32,-14 34,2 C 36,18 24,32 8,34 C -8,36 -24,28 -32,14 C -38,2 -36,-16 -24,-26 C -14,-34 0,-28 0,-28 Z"
        fill="rgb(0 212 170 / 0.06)"
        stroke="rgb(0 212 170 / 0.28)"
        strokeWidth="0.75"
        variants={revealVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Pulse ring — continuous motion only when allowed */}
      {shouldAnimate ? (
        <m.circle
          r={18}
          fill="none"
          stroke="rgb(0 212 170 / 0.28)"
          strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <circle
          r={18}
          fill="none"
          stroke="rgb(0 212 170 / 0.22)"
          strokeWidth="0.5"
        />
      )}

      {/* Inner nucleus */}
      <m.circle
        r={10}
        fill="rgb(0 212 170 / 0.16)"
        stroke="rgb(0 212 170 / 0.62)"
        strokeWidth="1"
        variants={variants({
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
          },
        })}
        initial="hidden"
        animate="visible"
      />

      {/* Core seed */}
      {shouldAnimate ? (
        <m.circle
          r={4}
          fill="#00d4aa"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <circle r={4} fill="#00d4aa" opacity={0.9} />
      )}

      {/* Precision cross-axis */}
      <g opacity="0.25" stroke="rgb(0 212 170 / 0.6)" strokeWidth="0.5">
        <line x1="-6" y1="0" x2="6" y2="0" />
        <line x1="0" y1="-6" x2="0" y2="6" />
      </g>
    </g>
  )
}
