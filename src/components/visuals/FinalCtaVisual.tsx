import { m, useTransform } from 'framer-motion'
import { ctaGlow, drawPath, fadeIn, scaleIn, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useGroupParallax, useNodeProximity } from '../../hooks/useNodeProximity'
import { usePointerNetwork } from '../../hooks/usePointerNetwork'
import { cn } from '../../utils/cn'
import {
  CTA_ANNOTATIONS,
  CTA_CONVERGENCE_PATHS,
  CTA_GATEWAY,
  CTA_INNER_RING,
  CTA_MOBILE_GATEWAY,
  CTA_MOBILE_NODES,
  CTA_MOBILE_ORBITAL,
  CTA_MOBILE_PATHS,
  CTA_MOBILE_VIEWBOX,
  CTA_ORBITAL_RING,
  CTA_OUTER_NODES,
  CTA_VISUAL_VIEWBOX,
} from './finalCtaVisualData'

const DESKTOP_VIEWBOX_SIZE = { width: 420, height: 380 }
const MOBILE_VIEWBOX_SIZE = { width: 320, height: 300 }

interface FinalCtaVisualProps {
  className?: string
}

export default function FinalCtaVisual({ className }: FinalCtaVisualProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const viewBox = isDesktop ? CTA_VISUAL_VIEWBOX : CTA_MOBILE_VIEWBOX
  const gateway = isDesktop ? CTA_GATEWAY : CTA_MOBILE_GATEWAY
  const nodes = isDesktop ? CTA_OUTER_NODES : CTA_MOBILE_NODES
  const paths = isDesktop ? CTA_CONVERGENCE_PATHS : CTA_MOBILE_PATHS
  const orbital = isDesktop ? CTA_ORBITAL_RING : CTA_MOBILE_ORBITAL
  const viewBoxSize = isDesktop ? DESKTOP_VIEWBOX_SIZE : MOBILE_VIEWBOX_SIZE

  const {
    pointerX,
    pointerY,
    parallaxX,
    parallaxY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerNetwork(shouldAnimate)

  const parallaxTransform = useGroupParallax(parallaxX, parallaxY, 0.8)

  const gatewayProximity = useNodeProximity(
    pointerX,
    pointerY,
    isActive,
    gateway.x,
    gateway.y,
    viewBoxSize,
    110,
    shouldAnimate,
  )

  const gatewayScale = useTransform(gatewayProximity, (p) => 1 + p * 0.15)
  const gatewayGlow = useTransform(gatewayProximity, (p) => 0.08 + p * 0.12)
  const crosshairOpacity = useTransform(isActive, (a) => (a as number) * 0.25)
  const crosshairX = useTransform(pointerX, (x) => (x as number) * viewBoxSize.width)
  const crosshairY = useTransform(pointerY, (y) => (y as number) * viewBoxSize.height)

  return (
    <m.div
      {...scrollRevealProps}
      viewport={viewport}
      variants={variants(fadeIn)}
      className={cn(
        'relative w-full select-none',
        '[mask-image:radial-gradient(ellipse_92%_88%_at_50%_50%,#000_38%,transparent_82%)]',
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
          <m.path
            d={orbital}
            stroke="rgb(0 212 170 / 0.15)"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            variants={variants(drawPath)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          />

          {isDesktop && (
            <m.path
              d={CTA_INNER_RING}
              stroke="rgb(123 97 255 / 0.2)"
              strokeWidth="0.5"
              variants={variants(fadeIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.2 }}
            />
          )}

          {paths.map((path, index) => (
            <m.path
              key={path.id}
              d={path.d}
              stroke={path.color}
              strokeWidth="1"
              strokeOpacity="0.45"
              strokeLinecap="round"
              variants={variants({
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: {
                      duration: 1,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0.3, delay: 0.15 + index * 0.08 },
                  },
                },
              })}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            />
          ))}

          {nodes.map((node, index) => (
            <g key={node.id}>
              <m.circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill={node.color}
                fillOpacity="0.12"
                stroke={node.color}
                strokeOpacity="0.55"
                strokeWidth="0.75"
                variants={variants(scaleIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.25 + index * 0.07 }}
              />
              <m.circle
                cx={node.x}
                cy={node.y}
                r={2}
                fill={node.color}
                variants={variants(fadeIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.32 + index * 0.07 }}
              />
            </g>
          ))}

          {shouldAnimate && (
            <g pointerEvents="none">
              <m.line
                x1={crosshairX}
                y1={0}
                x2={crosshairX}
                y2={viewBoxSize.height}
                stroke="rgb(0 212 170 / 0.35)"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                style={{ opacity: crosshairOpacity }}
              />
              <m.line
                x1={0}
                y1={crosshairY}
                x2={viewBoxSize.width}
                y2={crosshairY}
                stroke="rgb(0 212 170 / 0.35)"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                style={{ opacity: crosshairOpacity }}
              />
            </g>
          )}

          <m.g
            style={
              shouldAnimate
                ? { scale: gatewayScale, transformOrigin: `${gateway.x}px ${gateway.y}px` }
                : undefined
            }
          >
            {shouldAnimate ? (
              <m.circle
                cx={gateway.x}
                cy={gateway.y}
                r={22}
                fill="rgb(0 212 170 / 0.08)"
                stroke="rgb(0 212 170 / 0.45)"
                strokeWidth="1"
                style={{ fillOpacity: gatewayGlow }}
                variants={ctaGlow}
                initial="initial"
                animate="animate"
              />
            ) : (
              <circle
                cx={gateway.x}
                cy={gateway.y}
                r={22}
                fill="rgb(0 212 170 / 0.1)"
                stroke="rgb(0 212 170 / 0.45)"
                strokeWidth="1"
              />
            )}

            <m.circle
              cx={gateway.x}
              cy={gateway.y}
              r={8}
              fill="rgb(0 212 170 / 0.15)"
              stroke="rgb(0 212 170 / 0.6)"
              strokeWidth="0.75"
              variants={variants(scaleIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.35 }}
            />

            <m.circle
              cx={gateway.x}
              cy={gateway.y}
              r={3.5}
              fill="#00d4aa"
              variants={variants(fadeIn)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: 0.45 }}
            />

            <g
              opacity="0.3"
              stroke="rgb(0 212 170 / 0.6)"
              strokeWidth="0.5"
              transform={`translate(${gateway.x} ${gateway.y})`}
            >
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="0" y1="-10" x2="0" y2="10" />
            </g>
          </m.g>

          {isDesktop &&
            CTA_ANNOTATIONS.map((note, index) => (
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
                transition={{ delay: 0.65 + index * 0.08 }}
              >
                {note.label}
              </m.text>
            ))}
        </m.g>
      </svg>
    </m.div>
  )
}
