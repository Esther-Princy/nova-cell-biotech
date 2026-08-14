import { m, useTransform, type MotionValue } from 'framer-motion'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { PROXIMITY_RADIUS, VIEWBOX_SIZE } from '../../hooks/usePointerNetwork'
import type { NodeTier } from './types'

interface MolecularNodeProps {
  x: number
  y: number
  tier: NodeTier
  index: number
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  isActive: MotionValue<number>
}

const tierConfig: Record<
  NodeTier,
  { radius: number; fillOpacity: number; strokeOpacity: number; color: string }
> = {
  primary: {
    radius: 8,
    fillOpacity: 0.2,
    strokeOpacity: 0.72,
    color: '#00d4aa',
  },
  secondary: {
    radius: 5,
    fillOpacity: 0.14,
    strokeOpacity: 0.52,
    color: '#0ea5e9',
  },
}

export default function MolecularNode({
  x,
  y,
  tier,
  index,
  pointerX,
  pointerY,
  isActive,
}: MolecularNodeProps) {
  const { shouldAnimate, variants } = useMotionSafe()
  const config = tierConfig[tier]

  const proximity = useTransform(
    [pointerX, pointerY, isActive],
    ([px, py, active]) => {
      if (!active || !shouldAnimate) return 0
      const pxv = (px as number) * VIEWBOX_SIZE.width
      const pyv = (py as number) * VIEWBOX_SIZE.height
      const dist = Math.hypot(pxv - x, pyv - y)
      return Math.max(0, 1 - dist / PROXIMITY_RADIUS)
    },
  )

  const scale = useTransform(proximity, (p) => 1 + p * (tier === 'primary' ? 0.3 : 0.2))
  const glowOpacity = useTransform(proximity, (p) => config.strokeOpacity + p * 0.4)
  const ringOpacity = useTransform(proximity, (p) => p * 0.12)

  const floatDuration = 4 + (index % 3) * 0.8
  const floatAmplitude = tier === 'primary' ? 2 : 1
  const floatDelay = index * 0.15

  return (
    <m.g
      style={shouldAnimate ? { scale, transformOrigin: `${x}px ${y}px` } : undefined}
      aria-hidden="true"
    >
      <m.g
        animate={
          shouldAnimate
            ? { y: [0, -floatAmplitude, 0] }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelay,
                },
              }
            : undefined
        }
      >
        <m.circle
          cx={x}
          cy={y}
          r={config.radius + 6}
          fill={config.color}
          style={shouldAnimate ? { opacity: ringOpacity } : { opacity: 0 }}
        />

        <m.circle
          cx={x}
          cy={y}
          r={config.radius}
          fill={config.color}
          fillOpacity={config.fillOpacity}
          stroke={config.color}
          style={
            shouldAnimate
              ? { strokeOpacity: glowOpacity }
              : { strokeOpacity: config.strokeOpacity }
          }
          strokeWidth={tier === 'primary' ? 1 : 0.75}
          variants={variants({
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: 0.4 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          })}
          initial="hidden"
          animate="visible"
        />

        <m.circle
          cx={x}
          cy={y}
          r={tier === 'primary' ? 2 : 1.5}
          fill={config.color}
          variants={variants({
            hidden: { opacity: 0 },
            visible: {
              opacity: tier === 'primary' ? 0.9 : 0.7,
              transition: { duration: 0.3, delay: 0.5 + index * 0.08 },
            },
          })}
          initial="hidden"
          animate="visible"
        />
      </m.g>
    </m.g>
  )
}
