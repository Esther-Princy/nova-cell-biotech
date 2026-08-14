import { m, useTransform, type MotionValue } from 'framer-motion'
import { drawPath, fadeIn, scaleIn, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useGroupParallax, useNodeProximity } from '../../hooks/useNodeProximity'
import { usePointerNetwork } from '../../hooks/usePointerNetwork'
import { cn } from '../../utils/cn'
import {
  ANNOTATION_LINES,
  GRID_LINES,
  ORBITAL_ARC,
  PATHWAY_BRANCHES,
  PATHWAY_HUB,
  PATHWAY_VIEWBOX,
  PATHWAY_VIEWBOX_SIZE,
  PRECISION_MARKERS,
} from './innovationPathwayData'

interface InnovationPathwayVisualProps {
  className?: string
  activeBranchId?: string | null
  onBranchHover?: (branchId: string | null) => void
}

interface PathwayBranchProps {
  branch: (typeof PATHWAY_BRANCHES)[number]
  index: number
  activeBranchId?: string | null
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  isActive: MotionValue<number>
  onBranchHover?: (branchId: string | null) => void
}

function PathwayBranch({
  branch,
  index,
  activeBranchId,
  pointerX,
  pointerY,
  isActive,
  onBranchHover,
}: PathwayBranchProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const isHighlighted = activeBranchId === branch.id

  const proximity = useNodeProximity(
    pointerX,
    pointerY,
    isActive,
    branch.node.x,
    branch.node.y,
    PATHWAY_VIEWBOX_SIZE,
    90,
    shouldAnimate,
  )

  const nodeScale = useTransform(proximity, (p) => 1 + p * 0.35)
  const glowOpacity = useTransform(proximity, (p) => 0.15 + p * 0.25)
  const ringOpacity = useTransform(proximity, (p) => p * 0.2)

  return (
    <g key={branch.id}>
      <m.path
        d={branch.d}
        stroke={branch.color}
        strokeWidth={isHighlighted ? 1.5 : 1}
        strokeOpacity={isHighlighted ? 0.85 : 0.45}
        strokeLinecap="round"
        variants={variants({
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: {
                duration: 1,
                delay: 0.2 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: { duration: 0.3, delay: 0.2 + index * 0.12 },
            },
          },
        })}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      />

      <circle
        cx={branch.node.x}
        cy={branch.node.y}
        r={18}
        fill="transparent"
        className="cursor-default"
        onPointerEnter={() => onBranchHover?.(branch.id)}
        onPointerLeave={() => onBranchHover?.(null)}
      />

      <m.g
        style={
          shouldAnimate
            ? { scale: nodeScale, transformOrigin: `${branch.node.x}px ${branch.node.y}px` }
            : undefined
        }
      >
        <m.circle
          cx={branch.node.x}
          cy={branch.node.y}
          r={12}
          fill={branch.color}
          style={shouldAnimate ? { opacity: ringOpacity } : { opacity: isHighlighted ? 0.15 : 0 }}
        />

        <m.circle
          cx={branch.node.x}
          cy={branch.node.y}
          r={5}
          fill={branch.color}
          fillOpacity={isHighlighted ? 0.3 : 0.15}
          stroke={branch.color}
          strokeOpacity={isHighlighted ? 0.9 : 0.6}
          strokeWidth="0.75"
          style={shouldAnimate ? { fillOpacity: glowOpacity } : undefined}
          variants={variants(scaleIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.35 + index * 0.12 }}
        />

        <m.circle
          cx={branch.node.x}
          cy={branch.node.y}
          r={2}
          fill={branch.color}
          variants={variants(fadeIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.45 + index * 0.12 }}
        />

        <m.text
          x={branch.node.x}
          y={branch.node.y - 14}
          textAnchor="middle"
          fill={branch.color}
          fontSize="9"
          fontFamily="Syne, sans-serif"
          fontWeight="600"
          letterSpacing="0.15em"
          opacity={isHighlighted ? 1 : 0.7}
          variants={variants(fadeIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.5 + index * 0.12 }}
        >
          {branch.marker}
        </m.text>
      </m.g>
    </g>
  )
}

export default function InnovationPathwayVisual({
  className,
  activeBranchId,
  onBranchHover,
}: InnovationPathwayVisualProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const {
    pointerX,
    pointerY,
    parallaxX,
    parallaxY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerNetwork(shouldAnimate)

  const parallaxTransform = useGroupParallax(parallaxX, parallaxY, 0.6)

  const hubProximity = useNodeProximity(
    pointerX,
    pointerY,
    isActive,
    PATHWAY_HUB.x,
    PATHWAY_HUB.y,
    PATHWAY_VIEWBOX_SIZE,
    100,
    shouldAnimate,
  )

  const hubScale = useTransform(hubProximity, (p) => 1 + p * 0.2)
  const hubGlow = useTransform(hubProximity, (p) => 0.1 + p * 0.15)

  return (
    <m.div
      {...scrollRevealProps}
      viewport={viewport}
      variants={variants(fadeIn)}
      className={cn(
        'relative w-full select-none',
        '[mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_35%,transparent_80%)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={PATHWAY_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="presentation"
      >
        <m.g style={shouldAnimate ? { transform: parallaxTransform } : undefined}>
          {/* Precision grid */}
          <g opacity="0.35" stroke="#1e1e2e" strokeWidth="0.5">
            {GRID_LINES.vertical.map((x) => (
              <line key={`v-${x}`} x1={x} y1={40} x2={x} y2={400} />
            ))}
            {GRID_LINES.horizontal.map((y) => (
              <line key={`h-${y}`} x1={40} y1={y} x2={360} y2={y} />
            ))}
          </g>

          <m.path
            d={ORBITAL_ARC}
            stroke="rgb(123 97 255 / 0.25)"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            variants={variants(drawPath)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          />

          {PATHWAY_BRANCHES.map((branch, index) => (
            <PathwayBranch
              key={branch.id}
              branch={branch}
              index={index}
              activeBranchId={activeBranchId}
              pointerX={pointerX}
              pointerY={pointerY}
              isActive={isActive}
              onBranchHover={onBranchHover}
            />
          ))}

          <m.g
            style={
              shouldAnimate
                ? { scale: hubScale, transformOrigin: `${PATHWAY_HUB.x}px ${PATHWAY_HUB.y}px` }
                : undefined
            }
          >
            <m.circle
              cx={PATHWAY_HUB.x}
              cy={PATHWAY_HUB.y}
              r={12}
              fill="rgb(0 212 170 / 0.1)"
              stroke="rgb(0 212 170 / 0.55)"
              strokeWidth="1"
              style={shouldAnimate ? { fillOpacity: hubGlow } : undefined}
              variants={variants(scaleIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.1 }}
            />
            <m.circle
              cx={PATHWAY_HUB.x}
              cy={PATHWAY_HUB.y}
              r={4}
              fill="#00d4aa"
              variants={variants(fadeIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.2 }}
            />
          </m.g>

          {PRECISION_MARKERS.map((marker, index) => (
            <g key={`marker-${marker.label}`}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r={10}
                stroke="rgb(0 212 170 / 0.2)"
                strokeWidth="0.5"
              />
              <line
                x1={marker.x - 6}
                y1={marker.y}
                x2={marker.x + 6}
                y2={marker.y}
                stroke="rgb(0 212 170 / 0.15)"
                strokeWidth="0.5"
              />
              <line
                x1={marker.x}
                y1={marker.y - 6}
                x2={marker.x}
                y2={marker.y + 6}
                stroke="rgb(0 212 170 / 0.15)"
                strokeWidth="0.5"
              />
              <m.text
                x={marker.x}
                y={marker.y + 3}
                textAnchor="middle"
                fill="rgb(136 136 160 / 0.6)"
                fontSize="8"
                fontFamily="DM Sans, sans-serif"
                variants={variants(fadeIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.6 + index * 0.08 }}
              >
                {marker.label}
              </m.text>
            </g>
          ))}

          {ANNOTATION_LINES.map((line, index) => (
            <m.line
              key={`annotation-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgb(0 212 170 / 0.3)"
              strokeWidth="0.75"
              variants={variants(fadeIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.7 + index * 0.1 }}
            />
          ))}
        </m.g>
      </svg>
    </m.div>
  )
}
