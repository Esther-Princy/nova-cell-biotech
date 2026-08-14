import { m } from 'framer-motion'
import { useState } from 'react'
import { scrollRevealProps, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import type { CardContent } from '../../types'
import SectionShell from '../layout/SectionShell'
import Badge from '../ui/Badge'
import InnovationPathwayVisual from '../visuals/InnovationPathwayVisual'
import { PILLAR_BRANCH_MAP } from '../visuals/innovationPathwayData'
import { cn } from '../../utils/cn'

interface PillarItemProps {
  pillar: CardContent
  index: number
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}

function PillarItem({ pillar, index, isActive, onActivate, onDeactivate }: PillarItemProps) {
  const Icon = pillar.icon

  return (
    <article
      className="group relative pl-5"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0 h-full w-px transition-colors duration-300',
          isActive ? 'bg-accent-cyan/60' : 'bg-border group-hover:bg-accent-cyan/40',
        )}
      />
      <div className="flex gap-4">
        {Icon && (
          <div
            className={cn(
              'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center',
              'border bg-bg-surface transition-colors duration-300',
              isActive
                ? 'border-accent-cyan/50 text-accent-cyan'
                : 'border-border text-accent-cyan',
            )}
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </div>
        )}
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight text-text-primary">
            {pillar.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted text-pretty">
            {pillar.description}
          </p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className={cn(
          'mt-3 block font-display text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300',
          isActive ? 'text-accent-cyan/70' : 'text-text-subtle',
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  )
}

export default function Innovation() {
  const { innovation } = SITE_CONTENT
  const { variants, viewport } = useMotionSafe()
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null)

  return (
    <SectionShell
      id={SECTION_IDS.innovation}
      ariaLabelledBy="innovation-heading"
      className="border-t border-border/50"
    >
      <div
        className={cn(
          'grid items-start gap-10 md:gap-12 lg:gap-16',
          'lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1.1fr_0.9fr] xl:gap-20',
        )}
      >
        <m.div
          {...scrollRevealProps}
          viewport={viewport}
          variants={variants(staggerContainer)}
          className="order-1 lg:col-start-1 lg:row-start-1"
        >
          <m.div variants={variants(staggerItem)}>
            <Badge variant="subtle">{innovation.eyebrow}</Badge>
          </m.div>

          <m.h2
            id="innovation-heading"
            variants={variants(staggerItem)}
            className={cn(
              'mt-5 font-display text-3xl font-bold tracking-tight text-text-primary text-balance',
              'md:text-4xl lg:mt-6',
            )}
          >
            {innovation.title}
          </m.h2>

          <m.p
            variants={variants(staggerItem)}
            className="mt-5 max-w-xl text-base leading-relaxed text-text-muted text-pretty md:text-lg lg:mt-6"
          >
            {innovation.description}
          </m.p>
        </m.div>

        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28 lg:self-center">
          <InnovationPathwayVisual
            className="mx-auto max-w-xs sm:max-w-sm lg:max-w-none"
            activeBranchId={activeBranchId}
            onBranchHover={setActiveBranchId}
          />
        </div>

        <m.ul
          {...scrollRevealProps}
          viewport={viewport}
          variants={variants(staggerContainer)}
          className="order-3 flex flex-col gap-8 md:gap-10 lg:col-start-1 lg:row-start-2 lg:mt-14 lg:gap-10"
        >
          {innovation.pillars.map((pillar, index) => {
            const branchId = PILLAR_BRANCH_MAP[pillar.id]
            return (
              <m.li key={pillar.id} variants={variants(staggerItem)} tabIndex={0}>
                <PillarItem
                  pillar={pillar}
                  index={index}
                  isActive={activeBranchId === branchId}
                  onActivate={() => setActiveBranchId(branchId ?? null)}
                  onDeactivate={() => setActiveBranchId(null)}
                />
              </m.li>
            )
          })}
        </m.ul>
      </div>
    </SectionShell>
  )
}
