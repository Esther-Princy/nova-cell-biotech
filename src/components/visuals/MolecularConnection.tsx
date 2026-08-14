import { m, useTransform, type MotionValue } from 'framer-motion'
import { useMotionSafe } from '../../animations/useMotionSafe'
import type { ConnectionTier } from './types'

interface MolecularConnectionProps {
  d: string
  tier: ConnectionTier
  index: number
  isActive: MotionValue<number>
}

const tierStyles: Record<ConnectionTier, { stroke: string; width: number; baseOpacity: number }> = {
  primary: {
    stroke: 'url(#connection-gradient-primary)',
    width: 1.1,
    baseOpacity: 0.48,
  },
  secondary: {
    stroke: 'url(#connection-gradient-secondary)',
    width: 0.85,
    baseOpacity: 0.3,
  },
}

export default function MolecularConnection({
  d,
  tier,
  index,
  isActive,
}: MolecularConnectionProps) {
  const { shouldAnimate, variants } = useMotionSafe()
  const style = tierStyles[tier]

  const strokeOpacity = useTransform(isActive, (active) =>
    active ? style.baseOpacity + 0.1 : style.baseOpacity,
  )

  return (
    <m.path
      d={d}
      fill="none"
      stroke={style.stroke}
      strokeWidth={style.width}
      strokeLinecap="round"
      style={shouldAnimate ? { strokeOpacity } : { strokeOpacity: style.baseOpacity }}
      variants={variants({
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: 1.2, delay: 0.15 + index * 0.06, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4, delay: 0.15 + index * 0.06 },
          },
        },
      })}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    />
  )
}
