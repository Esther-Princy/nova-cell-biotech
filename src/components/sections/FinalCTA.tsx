import { m } from 'framer-motion'
import { scrollRevealProps, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import SectionShell from '../layout/SectionShell'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import FinalCtaVisual from '../visuals/FinalCtaVisual'
import { cn } from '../../utils/cn'

export default function FinalCTA() {
  const { finalCTA } = SITE_CONTENT
  const { variants, viewport } = useMotionSafe()

  return (
    <SectionShell
      id={SECTION_IDS.contact}
      ariaLabelledBy="contact-heading"
      className="relative overflow-hidden border-t border-border/50"
    >
      {/* Subtle ambient accent — not a full gradient banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgb(0_212_170/0.04),transparent)]"
      />

      <div
        className={cn(
          'relative grid items-center gap-12 lg:gap-16 xl:gap-20',
          'lg:grid-cols-[1.05fr_0.95fr]',
        )}
      >
        {/* Closing copy + CTAs */}
        <m.div
          {...scrollRevealProps}
          viewport={viewport}
          variants={variants(staggerContainer)}
          className="order-2 lg:order-1"
        >
          <m.div variants={variants(staggerItem)}>
            <Badge variant="default">{finalCTA.eyebrow}</Badge>
          </m.div>

          <m.h2
            id="contact-heading"
            variants={variants(staggerItem)}
            className={cn(
              'mt-5 font-display text-3xl font-bold tracking-tight text-text-primary text-balance',
              'md:text-4xl lg:mt-6 lg:text-[2.75rem] lg:leading-tight',
            )}
          >
            {finalCTA.title}
          </m.h2>

          <m.p
            variants={variants(staggerItem)}
            className="mt-5 max-w-lg text-base leading-relaxed text-text-muted text-pretty md:text-lg lg:mt-6"
          >
            {finalCTA.description}
          </m.p>

          <m.div
            variants={variants(staggerItem)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-12"
          >
            <Button
              href={finalCTA.primaryCTA.href}
              variant={finalCTA.primaryCTA.variant ?? 'primary'}
              size="lg"
              external={finalCTA.primaryCTA.href.startsWith('mailto:')}
            >
              {finalCTA.primaryCTA.label}
            </Button>

            {finalCTA.secondaryCTA && (
              <Button
                href={finalCTA.secondaryCTA.href}
                variant={finalCTA.secondaryCTA.variant ?? 'ghost'}
                size="lg"
              >
                {finalCTA.secondaryCTA.label}
              </Button>
            )}
          </m.div>
        </m.div>

        {/* Convergence visual */}
        <div className="order-1 lg:order-2 lg:justify-self-end">
          <FinalCtaVisual className="mx-auto max-w-xs sm:max-w-sm lg:max-w-none lg:w-[105%]" />
        </div>
      </div>
    </SectionShell>
  )
}
