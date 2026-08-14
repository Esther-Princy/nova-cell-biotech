import { m, useTransform } from 'framer-motion'
import { drawPath, fadeIn, scaleIn, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useNodeProximity } from '../../hooks/useNodeProximity'
import { usePointerNetwork } from '../../hooks/usePointerNetwork'
import { cn } from '../../utils/cn'
import {
  METRICS_ANNOTATIONS,
  METRICS_AREA_PATH,
  METRICS_AXIS,
  METRICS_DATA_POINTS,
  METRICS_TICKS_X,
  METRICS_TICKS_Y,
  METRICS_TREND_PATH,
  METRICS_VIEWBOX,
} from './impactMetricsData'

const METRICS_VIEWBOX_SIZE = { width: 400, height: 200 }

interface ImpactMetricsVisualProps {
  className?: string
}

interface DataPointProps {
  point: { x: number; y: number }
  index: number
  pointerX: ReturnType<typeof usePointerNetwork>['pointerX']
  pointerY: ReturnType<typeof usePointerNetwork>['pointerY']
  isActive: ReturnType<typeof usePointerNetwork>['isActive']
}

function InteractiveDataPoint({ point, index, pointerX, pointerY, isActive }: DataPointProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()

  const proximity = useNodeProximity(
    pointerX,
    pointerY,
    isActive,
    point.x,
    point.y,
    METRICS_VIEWBOX_SIZE,
    60,
    shouldAnimate,
  )

  const pointScale = useTransform(proximity, (p) => 1 + p * 0.8)
  const pointOpacity = useTransform(proximity, (p) => 0.6 + p * 0.4)

  return (
    <m.circle
      cx={point.x}
      cy={point.y}
      r={3}
      fill="#00d4aa"
      style={
        shouldAnimate
          ? { scale: pointScale, transformOrigin: `${point.x}px ${point.y}px`, opacity: pointOpacity }
          : undefined
      }
      variants={variants(scaleIn)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay: 0.4 + index * 0.08 }}
    />
  )
}

export default function ImpactMetricsVisual({ className }: ImpactMetricsVisualProps) {
  const { variants, viewport, shouldAnimate } = useMotionSafe()
  const {
    pointerX,
    pointerY,
    isActive,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerNetwork(shouldAnimate)

  const scanOpacity = useTransform(isActive, (a) => (a as number) * 0.3)
  const scanX = useTransform(pointerX, (x) => (x as number) * METRICS_VIEWBOX_SIZE.width)
  const scanY = useTransform(pointerY, (y) => (y as number) * METRICS_VIEWBOX_SIZE.height)

  return (
    <m.div
      {...scrollRevealProps}
      viewport={viewport}
      variants={variants(fadeIn)}
      className={cn(
        'relative w-full select-none',
        '[mask-image:radial-gradient(ellipse_95%_90%_at_50%_60%,#000_30%,transparent_78%)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={METRICS_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="presentation"
      >
        <defs>
          <linearGradient id="impact-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7b61ff" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="impact-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g opacity="0.35" stroke="#1e1e2e" strokeWidth="0.5">
          {METRICS_TICKS_Y.map((y) => (
            <line key={`ty-${y}`} x1={METRICS_AXIS.x1} y1={y} x2={METRICS_AXIS.x2} y2={y} />
          ))}
          {METRICS_TICKS_X.map((x) => (
            <line key={`tx-${x}`} x1={x} y1={METRICS_AXIS.yTop} x2={x} y2={METRICS_AXIS.y1} />
          ))}
        </g>

        <line
          x1={METRICS_AXIS.x1}
          y1={METRICS_AXIS.y1}
          x2={METRICS_AXIS.x2}
          y2={METRICS_AXIS.y2}
          stroke="rgb(0 212 170 / 0.2)"
          strokeWidth="0.75"
        />
        <line
          x1={METRICS_AXIS.x1}
          y1={METRICS_AXIS.yTop}
          x2={METRICS_AXIS.x1}
          y2={METRICS_AXIS.y1}
          stroke="rgb(0 212 170 / 0.2)"
          strokeWidth="0.75"
        />

        <m.path
          d={METRICS_AREA_PATH}
          fill="url(#impact-area-gradient)"
          variants={variants(fadeIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.3 }}
        />

        <m.path
          d={METRICS_TREND_PATH}
          stroke="url(#impact-line-gradient)"
          strokeWidth="1.25"
          strokeLinecap="round"
          variants={variants(drawPath)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        />

        {shouldAnimate && (
          <g pointerEvents="none">
            <m.line
              x1={scanX}
              y1={METRICS_AXIS.yTop}
              x2={scanX}
              y2={METRICS_AXIS.y1}
              stroke="rgb(0 212 170 / 0.4)"
              strokeWidth="0.5"
              strokeDasharray="2 3"
              style={{ opacity: scanOpacity }}
            />
            <m.circle
              cx={scanX}
              cy={scanY}
              r={4}
              fill="none"
              stroke="rgb(123 97 255 / 0.5)"
              strokeWidth="0.5"
              style={{ opacity: scanOpacity }}
            />
          </g>
        )}

        {METRICS_DATA_POINTS.map((point, index) => (
          <InteractiveDataPoint
            key={`pt-${point.x}`}
            point={point}
            index={index}
            pointerX={pointerX}
            pointerY={pointerY}
            isActive={isActive}
          />
        ))}

        {METRICS_ANNOTATIONS.map((note, index) => (
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
      </svg>
    </m.div>
  )
}
