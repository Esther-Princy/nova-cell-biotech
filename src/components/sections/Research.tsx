import { m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { scrollRevealProps, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import { useSectionNavigation } from '../../hooks/useSectionNavigation'
import type { ResearchStep } from '../../types'
import SectionShell from '../layout/SectionShell'
import Badge from '../ui/Badge'
import ResearchPipelineVisual from '../visuals/ResearchPipelineVisual'
import { cn } from '../../utils/cn'

function StageControl({
  step,
  index,
  isActive,
  onActivate,
}: {
  step: ResearchStep
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  const Icon = step.icon

  return (
    <button
      type="button"
      onClick={onActivate}
      onFocus={onActivate}
      aria-pressed={isActive}
      aria-label={`${step.code}: ${step.title}`}
      className={cn(
        'group w-full rounded-sm py-4 text-left transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
      )}
    >
      <div
        className={cn(
          'relative pl-5 transition-colors duration-200',
          isActive ? 'border-l-accent-cyan' : 'border-l-border',
          'border-l-2',
        )}
      >
        <div className="flex items-start gap-4">
          {Icon && (
            <div
              className={cn(
                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border',
                isActive
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                  : 'border-border bg-bg-surface text-text-muted',
              )}
              aria-hidden="true"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={cn(
                  'font-display text-[0.625rem] font-semibold uppercase tracking-[0.2em]',
                  isActive ? 'text-accent-cyan' : 'text-text-subtle',
                )}
              >
                {step.code}
              </span>
              <span
                aria-hidden="true"
                className="font-display text-[0.625rem] uppercase tracking-[0.16em] text-text-subtle"
              >
                {step.phase}
              </span>
            </div>
            <h3
              className={cn(
                'mt-1.5 font-display text-base font-semibold tracking-tight',
                isActive ? 'text-text-primary' : 'text-text-muted',
              )}
            >
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted text-pretty">
              {step.description}
            </p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mt-3 block font-display text-[0.625rem] font-medium uppercase tracking-[0.2em] text-text-subtle"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </button>
  )
}

export default function Research() {
  const { research } = SITE_CONTENT
  const { variants, viewport } = useMotionSafe()
  const { registerArrivalHandler } = useSectionNavigation()
  const [activeStageId, setActiveStageId] = useState(research.steps[0]?.id ?? '')

  useEffect(() => {
    return registerArrivalHandler(SECTION_IDS.research, () => {
      setActiveStageId(research.steps[0]?.id ?? '')
    })
  }, [registerArrivalHandler, research.steps])

  return (
    <SectionShell
      id={SECTION_IDS.research}
      ariaLabelledBy="research-heading"
      className="border-t border-border/50 bg-bg-elevated/30"
    >
      {/* Section intro */}
      <m.div
        {...scrollRevealProps}
        viewport={viewport}
        variants={variants(staggerContainer)}
        className="max-w-3xl"
      >
        <m.div variants={variants(staggerItem)}>
          <Badge variant="default">{research.eyebrow}</Badge>
        </m.div>

        <m.h2
          id="research-heading"
          variants={variants(staggerItem)}
          className="mt-5 font-display text-3xl font-bold tracking-tight text-text-primary text-balance md:text-4xl lg:mt-6"
        >
          {research.title}
        </m.h2>

        <m.p
          variants={variants(staggerItem)}
          className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted text-pretty md:text-lg lg:mt-6"
        >
          {research.description}
        </m.p>
      </m.div>

      {/* Pipeline + stage controls */}
      <div
        className={cn(
          'mt-12 grid items-start gap-10 md:mt-14 md:gap-12 lg:mt-16',
          'lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[0.95fr_1.05fr] xl:gap-20',
        )}
      >
        {/* Interactive stage list */}
        <m.ul
          {...scrollRevealProps}
          viewport={viewport}
          variants={variants(staggerContainer)}
          className="order-2 list-none p-0 lg:order-1"
        >
          {research.steps.map((step, index) => (
            <m.li key={step.id} variants={variants(staggerItem)}>
              <StageControl
                step={step}
                index={index}
                isActive={activeStageId === step.id}
                onActivate={() => setActiveStageId(step.id)}
              />
            </m.li>
          ))}
        </m.ul>

        {/* Pipeline visual */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-28">
          <ResearchPipelineVisual
            steps={research.steps}
            activeStageId={activeStageId}
            className="mx-auto max-w-md md:max-w-lg lg:max-w-none"
          />
        </div>
      </div>
    </SectionShell>
  )
}
