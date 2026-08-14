import { m } from 'framer-motion'
import { useMemo } from 'react'
import { fadeIn, scaleIn, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { ResearchStep } from '../../types'
import { cn } from '../../utils/cn'
import {
  COORD_ANNOTATIONS,
  DESKTOP_PIPELINE,
  MOBILE_PIPELINE,
  PIPELINE_GRID_DESKTOP,
  type PipelineLayout,
} from './researchPipelineData'

interface ResearchPipelineVisualProps {
  steps: ResearchStep[]
  activeStageId: string
  className?: string
}

function getSegmentOpacity(
  from: string,
  to: string,
  activeId: string,
  stageIds: string[],
): number {
  const activeIndex = stageIds.indexOf(activeId)
  const fromIndex = stageIds.indexOf(from)
  const toIndex = stageIds.indexOf(to)

  if (activeIndex === fromIndex || activeIndex === toIndex) return 0.75
  if (
    activeIndex >= 0 &&
    fromIndex >= 0 &&
    toIndex >= 0 &&
    activeIndex >= Math.min(fromIndex, toIndex) &&
    activeIndex <= Math.max(fromIndex, toIndex)
  ) {
    return 0.5
  }
  return 0.3
}

function segmentEndpoints(segmentId: string): [string, string] {
  const body = segmentId.replace('seg-', '')
  const splitIndex = body.indexOf('-')
  if (splitIndex === -1) return [body, body]
  return [body.slice(0, splitIndex), body.slice(splitIndex + 1)]
}

export default function ResearchPipelineVisual({
  steps,
  activeStageId,
  className,
}: ResearchPipelineVisualProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const layout: PipelineLayout = isDesktop ? DESKTOP_PIPELINE : MOBILE_PIPELINE
  const stageIds = useMemo(() => steps.map((s) => s.id), [steps])

  const stepById = useMemo(
    () => new Map(steps.map((step) => [step.id, step])),
    [steps],
  )

  const [baselineX1, baselineY1, baselineX2, baselineY2] = layout.baseline
    .replace('M ', '')
    .replace('L ', ',')
    .split(',')
    .map(Number)

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
        viewBox={layout.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        role="presentation"
      >
        {isDesktop && (
          <g opacity="0.3" stroke="#1e1e2e" strokeWidth="0.5">
            {PIPELINE_GRID_DESKTOP.horizontal.map((y) => (
              <line key={`gh-${y}`} x1={40} y1={y} x2={680} y2={y} />
            ))}
            {PIPELINE_GRID_DESKTOP.vertical.map((x) => (
              <line key={`gv-${x}`} x1={x} y1={40} x2={x} y2={200} />
            ))}
          </g>
        )}

        <m.line
          x1={baselineX1}
          y1={baselineY1}
          x2={baselineX2}
          y2={baselineY2}
          stroke="rgb(30 30 46 / 0.8)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          variants={variants(fadeIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        />

        {layout.segments.map((segment, index) => {
          const [from, to] = segmentEndpoints(segment.id)
          const isActivePath =
            activeStageId === from ||
            activeStageId === to ||
            stageIds.indexOf(activeStageId) > stageIds.indexOf(from)

          return (
            <m.path
              key={segment.id}
              d={segment.d}
              stroke={segment.color}
              strokeWidth={isActivePath ? 1.25 : 1}
              strokeOpacity={getSegmentOpacity(from, to, activeStageId, stageIds)}
              strokeLinecap="round"
              variants={variants({
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: {
                      duration: 0.9,
                      delay: 0.15 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: { duration: 0.3, delay: 0.15 + index * 0.1 },
                  },
                },
              })}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            />
          )
        })}

        {shouldAnimate &&
          layout.particles.map((particle) => {
            const segment = layout.segments.find((s) => s.id === particle.segmentId)
            if (!segment) return null

            return (
              <m.circle
                key={particle.id}
                r={2}
                fill="#00d4aa"
                style={{
                  offsetPath: `path('${segment.d}')`,
                  offsetRotate: '0deg',
                }}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'linear',
                  times: [0, 0.05, 0.92, 1],
                }}
              />
            )
          })}

        {layout.stages.map((stage, index) => {
          const step = stepById.get(stage.id)
          const isActive = activeStageId === stage.id

          return (
            <g key={stage.id}>
              <m.circle
                cx={stage.x}
                cy={stage.y}
                r={isActive ? 16 : 13}
                fill={stage.color}
                fillOpacity={isActive ? 0.18 : 0.08}
                stroke={stage.color}
                strokeOpacity={isActive ? 0.85 : 0.45}
                strokeWidth={isActive ? 1.25 : 0.75}
                variants={variants(scaleIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.25 + index * 0.08 }}
              />

              <m.circle
                cx={stage.x}
                cy={stage.y}
                r={isActive ? 4.5 : 3.5}
                fill={stage.color}
                variants={variants(fadeIn)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: 0.35 + index * 0.08 }}
              />

              <text
                x={stage.x}
                y={isDesktop ? stage.y - 28 : stage.y - 22}
                textAnchor="middle"
                fill={isActive ? stage.color : 'rgb(136 136 160 / 0.7)'}
                fontSize={isDesktop ? 8 : 7}
                fontFamily="Syne, sans-serif"
                fontWeight="600"
                letterSpacing="0.14em"
              >
                {step?.code ?? stage.id.toUpperCase()}
              </text>

              {isDesktop && stage.annotation && (
                <text
                  x={stage.x}
                  y={stage.y + 32}
                  textAnchor="middle"
                  fill="rgb(90 90 114 / 0.7)"
                  fontSize="7"
                  fontFamily="DM Sans, sans-serif"
                  letterSpacing="0.06em"
                >
                  {stage.annotation}
                </text>
              )}
            </g>
          )
        })}

        {isDesktop &&
          COORD_ANNOTATIONS.map((note, index) => (
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
              transition={{ delay: 0.7 + index * 0.08 }}
            >
              {note.label}
            </m.text>
          ))}
      </svg>
    </m.div>
  )
}
