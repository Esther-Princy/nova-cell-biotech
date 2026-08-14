import { m, useTransform, type MotionValue } from 'framer-motion'
import { fadeIn, scaleIn, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useGroupParallax, useNodeProximity } from '../../hooks/useNodeProximity'
import { usePointerNetwork } from '../../hooks/usePointerNetwork'
import { cn } from '../../utils/cn'
import {
  CONSTELLATION_ANNOTATIONS,
  CONSTELLATION_CONNECTIONS,
  CONSTELLATION_HUB,
  CONSTELLATION_NODES,
  CONSTELLATION_VIEWBOX,
  MOBILE_CONSTELLATION_CONNECTIONS,
  MOBILE_CONSTELLATION_HUB,
  MOBILE_CONSTELLATION_NODES,
  MOBILE_CONSTELLATION_VIEWBOX,
  MOBILE_CONSTELLATION_VIEWBOX_SIZE,
  type ConstellationConnection,
  type ConstellationNode,
} from './capabilitiesNetworkData'

const DESKTOP_VIEWBOX_SIZE = { width: 360, height: 400 }

interface CapabilitiesNetworkVisualProps {
  className?: string
  activeNodeId?: string | null
  onNodeHover?: (nodeId: string | null) => void
}

interface NetworkNodeProps {
  node: ConstellationNode
  index: number
  isHighlighted: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  isActive: MotionValue<number>
  viewBoxSize: { width: number; height: number }
  onNodeHover?: (nodeId: string | null) => void
}

function NetworkNode({
  node,
  index,
  isHighlighted,
  pointerX,
  pointerY,
  isActive,
  viewBoxSize,
  onNodeHover,
}: NetworkNodeProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()

  const proximity = useNodeProximity(
    pointerX,
    pointerY,
    isActive,
    node.x,
    node.y,
    viewBoxSize,
    75,
    shouldAnimate,
  )

  const nodeScale = useTransform(proximity, (p) => 1 + p * 0.4)
  const ringOpacity = useTransform(proximity, (p) => p * 0.25)

  return (
    <g key={node.id}>
      <circle
        cx={node.x}
        cy={node.y}
        r={16}
        fill="transparent"
        className="cursor-default"
        onPointerEnter={() => onNodeHover?.(node.id)}
        onPointerLeave={() => onNodeHover?.(null)}
      />

      <m.g
        style={
          shouldAnimate
            ? { scale: nodeScale, transformOrigin: `${node.x}px ${node.y}px` }
            : undefined
        }
      >
        <m.circle
          cx={node.x}
          cy={node.y}
          r={11}
          fill={node.color}
          style={shouldAnimate ? { opacity: ringOpacity } : { opacity: isHighlighted ? 0.12 : 0 }}
        />

        <m.circle
          cx={node.x}
          cy={node.y}
          r={7}
          fill={node.color}
          fillOpacity={isHighlighted ? 0.25 : 0.12}
          stroke={node.color}
          strokeOpacity={isHighlighted ? 0.85 : 0.55}
          strokeWidth={isHighlighted ? 1 : 0.75}
          variants={variants(scaleIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.2 + index * 0.06 }}
        />

        <m.circle
          cx={node.x}
          cy={node.y}
          r={2.5}
          fill={node.color}
          variants={variants(fadeIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.28 + index * 0.06 }}
        />
      </m.g>
    </g>
  )
}

export default function CapabilitiesNetworkVisual({
  className,
  activeNodeId,
  onNodeHover,
}: CapabilitiesNetworkVisualProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const nodes = isDesktop ? CONSTELLATION_NODES : MOBILE_CONSTELLATION_NODES
  const connections = isDesktop ? CONSTELLATION_CONNECTIONS : MOBILE_CONSTELLATION_CONNECTIONS
  const viewBox = isDesktop ? CONSTELLATION_VIEWBOX : MOBILE_CONSTELLATION_VIEWBOX
  const hub = isDesktop ? CONSTELLATION_HUB : MOBILE_CONSTELLATION_HUB
  const viewBoxSize = isDesktop ? DESKTOP_VIEWBOX_SIZE : MOBILE_CONSTELLATION_VIEWBOX_SIZE

  const {
    pointerX,
    pointerY,
    parallaxX,
    parallaxY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerNetwork(shouldAnimate)

  const parallaxTransform = useGroupParallax(parallaxX, parallaxY, 0.5)

  const isConnectionActive = (connection: ConstellationConnection) =>
    activeNodeId != null &&
    (connection.nodeIds[0] === activeNodeId || connection.nodeIds[1] === activeNodeId)

  return (
    <m.div
      {...scrollRevealProps}
      viewport={viewport}
      variants={variants(fadeIn)}
      className={cn(
        'relative w-full select-none',
        '[mask-image:radial-gradient(ellipse_90%_88%_at_50%_50%,#000_36%,transparent_80%)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="presentation"
      >
        <m.g style={shouldAnimate ? { transform: parallaxTransform } : undefined}>
          <m.ellipse
            cx={hub.x}
            cy={hub.y}
            rx={isDesktop ? 148 : 108}
            ry={isDesktop ? 148 : 108}
            stroke="rgb(0 212 170 / 0.12)"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            variants={variants(fadeIn)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          />

          {connections.map((connection, index) => {
            const highlighted = isConnectionActive(connection)
            return (
              <m.path
                key={connection.id}
                d={connection.d}
                stroke={highlighted ? 'rgb(0 212 170 / 0.55)' : 'rgb(0 212 170 / 0.25)'}
                strokeWidth={highlighted ? 1.25 : 0.75}
                strokeLinecap="round"
                variants={variants({
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: {
                        duration: 0.8,
                        delay: 0.1 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.3, delay: 0.1 + index * 0.05 },
                    },
                  },
                })}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              />
            )
          })}

          <m.circle
            cx={hub.x}
            cy={hub.y}
            r={8}
            fill="rgb(0 212 170 / 0.1)"
            stroke="rgb(0 212 170 / 0.45)"
            strokeWidth="0.75"
            variants={variants(scaleIn)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.15 }}
          />
          <m.circle
            cx={hub.x}
            cy={hub.y}
            r={3}
            fill="#00d4aa"
            variants={variants(fadeIn)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.25 }}
          />

          {nodes.map((node, index) => (
            <NetworkNode
              key={node.id}
              node={node}
              index={index}
              isHighlighted={activeNodeId === node.id}
              pointerX={pointerX}
              pointerY={pointerY}
              isActive={isActive}
              viewBoxSize={viewBoxSize}
              onNodeHover={onNodeHover}
            />
          ))}

          {isDesktop &&
            CONSTELLATION_ANNOTATIONS.map((note, index) => (
              <m.text
                key={note.label}
                x={note.x}
                y={note.y}
                fill="rgb(90 90 114 / 0.55)"
                fontSize="7"
                fontFamily="DM Sans, sans-serif"
                letterSpacing="0.08em"
                variants={variants(fadeIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.6 + index * 0.08 }}
              >
                {note.label}
              </m.text>
            ))}
        </m.g>
      </svg>
    </m.div>
  )
}
