import { m } from 'framer-motion'
import { scrollRevealProps, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import SectionShell from '../layout/SectionShell'
import SectionHeading from '../ui/SectionHeading'
import StatCounter from '../ui/StatCounter'
import ImpactMetricsVisual from '../visuals/ImpactMetricsVisual'
import { cn } from '../../utils/cn'

export default function Impact() {
  const { impact } = SITE_CONTENT
  const { variants, viewport } = useMotionSafe()

  const [featuredStat, ...remainingStats] = impact.stats

  return (
    <SectionShell
      id={SECTION_IDS.impact}
      ariaLabelledBy="impact-heading"
      className="border-t border-border/50 bg-bg-elevated/20"
    >
      <div
        className={cn(
          'grid items-start gap-12 lg:gap-16 xl:gap-20',
          'lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[0.95fr_1.05fr]',
        )}
      >
        {/* Editorial intro + featured metric */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <SectionHeading
            eyebrow={impact.eyebrow}
            title={impact.title}
            description={impact.description}
            titleId="impact-heading"
            badgeVariant="subtle"
            animated
          />

          {featuredStat && (
            <div className="border-t border-accent-cyan/25 pt-8 lg:pt-10">
              <StatCounter
                value={featuredStat.value}
                suffix={featuredStat.suffix}
                prefix={featuredStat.prefix}
                label={featuredStat.label}
                description={featuredStat.description}
                className="gap-3 [&>p:first-child]:text-5xl [&>p:first-child]:md:text-6xl [&>p:first-child]:lg:text-7xl"
              />
            </div>
          )}
        </div>

        {/* Metrics visual + supporting stats */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <ImpactMetricsVisual className="mx-auto w-full max-w-md lg:max-w-none" />

          <m.ul
            {...scrollRevealProps}
            viewport={viewport}
            variants={variants(staggerContainer)}
            className="grid list-none gap-8 border-t border-border/60 p-0 pt-8 sm:grid-cols-3 sm:gap-6 lg:pt-10"
          >
            {remainingStats.map((stat) => (
              <m.li
                key={stat.id}
                variants={variants(staggerItem)}
                className="relative sm:border-l sm:border-border/60 sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                  description={stat.description}
                  className="gap-2 [&>p:first-child]:text-3xl [&>p:first-child]:md:text-4xl"
                />
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </SectionShell>
  )
}
