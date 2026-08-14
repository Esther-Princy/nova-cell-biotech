import { m, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { usePointerNetwork } from '../../hooks/usePointerNetwork'
import { cn } from '../../utils/cn'
import MolecularConnection from './MolecularConnection'
import MolecularCore from './MolecularCore'
import MolecularNode from './MolecularNode'
import MolecularParticles from './MolecularParticles'
import { useNetworkConfig } from './useNetworkConfig'

interface MolecularVisualProps {
  className?: string
}

export default function MolecularVisual({ className }: MolecularVisualProps) {
  const { shouldAnimate } = useMotionSafe()
  const { nodes, particles, paths, core, viewBox } = useNetworkConfig()

  const {
    pointerX,
    pointerY,
    parallaxX,
    parallaxY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerNetwork(shouldAnimate)

  const pathMap = useMemo(
    () => new Map(paths.map((p) => [p.id, p.d])),
    [paths],
  )

  const networkTransform = useTransform(
    [parallaxX, parallaxY],
    ([x, y]) => `translate(${x}px, ${y}px)`,
  )

  return (
    <div
      className={cn(
        'relative aspect-square w-full select-none',
        '[mask-image:radial-gradient(ellipse_85%_85%_at_50%_50%,#000_38%,transparent_76%)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="presentation"
      >
        <defs>
          <linearGradient
            id="connection-gradient-primary"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#7b61ff" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient
            id="connection-gradient-secondary"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.32" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx={core.x}
          cy={core.y}
          rx={160}
          ry={150}
          fill="url(#core-glow)"
        />

        <m.g style={shouldAnimate ? { transform: networkTransform } : undefined}>
          <g>
            {paths.map((path, index) => (
              <MolecularConnection
                key={path.id}
                d={path.d}
                tier={path.tier}
                index={index}
                isActive={isActive}
              />
            ))}
          </g>

          <MolecularParticles particles={particles} paths={pathMap} />

          <g>
            {nodes.map((node, index) => (
              <MolecularNode
                key={node.id}
                x={node.x}
                y={node.y}
                tier={node.tier}
                index={index}
                pointerX={pointerX}
                pointerY={pointerY}
                isActive={isActive}
              />
            ))}
          </g>

          <MolecularCore x={core.x} y={core.y} />
        </m.g>
      </svg>
    </div>
  )
}
