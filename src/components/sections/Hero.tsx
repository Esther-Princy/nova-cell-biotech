import { m } from 'framer-motion'
import {
  heroHeadlineContainer,
  heroHeadlineLine,
  heroSequence,
  heroSequenceItem,
  heroVisualReveal,
} from '../../animations/variants'
import { mountRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import { MolecularVisual } from '../visuals'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

export default function Hero() {
  const { brand, hero } = SITE_CONTENT
  const { variants } = useMotionSafe()

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className={cn(
        'relative overflow-hidden',
        'pt-20 pb-16 md:pt-24 md:pb-20 lg:min-h-screen lg:pt-24 lg:pb-24',
      )}
    >
      <div className="container-default">
        <div
          className={cn(
            'grid items-center gap-12',
            'lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:grid-cols-[1.1fr_1fr] xl:gap-16',
            'lg:min-h-[calc(100vh-6rem)]',
          )}
        >
          {/* Editorial content */}
          <m.header
            {...mountRevealProps}
            variants={variants(heroSequence)}
            className="order-1 flex flex-col"
          >
            {/* Brand + eyebrow */}
            <m.div variants={variants(heroSequenceItem)} className="mb-8 lg:mb-10">
              <p className="mb-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-text-subtle">
                {brand.name}
              </p>
              <Badge variant="subtle">{hero.eyebrow}</Badge>
            </m.div>

            {/* Headline */}
            <m.div variants={variants(heroSequenceItem)} className="mb-8 lg:mb-10">
              <h1
                id="hero-heading"
                className="font-display font-bold uppercase leading-[0.95] tracking-tight text-text-primary"
              >
                <m.span
                  className="flex flex-col"
                  variants={variants(heroHeadlineContainer)}
                >
                  <span className="block overflow-hidden">
                    <m.span
                      className="block text-[clamp(2rem,5.5vw,3.75rem)]"
                      variants={variants(heroHeadlineLine)}
                    >
                      {hero.headline}
                    </m.span>
                  </span>
                  <span className="block overflow-hidden">
                    <m.span
                      className="block text-[clamp(2rem,5.5vw,3.75rem)] text-accent-cyan"
                      variants={variants(heroHeadlineLine)}
                    >
                      {hero.headlineAccent}
                    </m.span>
                  </span>
                </m.span>
              </h1>
            </m.div>

            {/* Supporting copy */}
            <m.p
              variants={variants(heroSequenceItem)}
              className="mb-10 max-w-md text-base leading-relaxed text-text-muted text-pretty md:text-lg lg:max-w-lg"
            >
              {hero.description}
            </m.p>

            {/* CTAs */}
            <m.div
              variants={variants(heroSequenceItem)}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                href={hero.primaryCTA.href}
                variant="primary"
                size="lg"
              >
                {hero.primaryCTA.label}
              </Button>
              <Button
                href={hero.secondaryCTA.href}
                variant="secondary"
                size="lg"
              >
                {hero.secondaryCTA.label}
              </Button>
            </m.div>
          </m.header>

          {/* Molecular visual field */}
          <m.div
            {...mountRevealProps}
            variants={variants(heroVisualReveal)}
            className={cn(
              'relative order-2',
              'flex items-center justify-center',
              'lg:justify-end',
            )}
          >
            <MolecularVisual
              className={cn(
                'relative w-full',
                'max-w-md sm:max-w-lg',
                'lg:max-w-none lg:w-[128%] lg:-mr-8 xl:w-[135%] xl:-mr-12',
              )}
            />
          </m.div>
        </div>
      </div>
    </section>
  )
}
