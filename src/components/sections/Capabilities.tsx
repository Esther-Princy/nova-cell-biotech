import { m } from 'framer-motion'
import { useState } from 'react'
import { scrollRevealProps, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT, SECTION_IDS } from '../../constants/content'
import SectionShell from '../layout/SectionShell'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import CapabilitiesNetworkVisual from '../visuals/CapabilitiesNetworkVisual'
import { cn } from '../../utils/cn'

export default function Capabilities() {
  const { capabilities } = SITE_CONTENT
  const { variants, viewport } = useMotionSafe()
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)

  return (
    <SectionShell
      id={SECTION_IDS.capabilities}
      ariaLabelledBy="capabilities-heading"
      className="border-t border-border/50"
    >
      <m.div
        {...scrollRevealProps}
        viewport={viewport}
        variants={variants(staggerContainer)}
        className="max-w-3xl"
      >
        <m.div variants={variants(staggerItem)}>
          <Badge variant="violet">{capabilities.eyebrow}</Badge>
        </m.div>

        <m.h2
          id="capabilities-heading"
          variants={variants(staggerItem)}
          className="mt-5 font-display text-3xl font-bold tracking-tight text-text-primary text-balance md:text-4xl lg:mt-6"
        >
          {capabilities.title}
        </m.h2>

        <m.p
          variants={variants(staggerItem)}
          className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted text-pretty md:text-lg lg:mt-6"
        >
          {capabilities.description}
        </m.p>
      </m.div>

      <div
        className={cn(
          'mt-12 grid items-start gap-10 md:mt-14 md:gap-12 lg:mt-16',
          'lg:grid-cols-[0.85fr_1.15fr] xl:grid-cols-[0.8fr_1.2fr] xl:gap-20',
        )}
      >
        <div className="order-1 lg:sticky lg:top-28 lg:self-center">
          <CapabilitiesNetworkVisual
            className="mx-auto max-w-xs sm:max-w-sm lg:max-w-none"
            activeNodeId={activeNodeId}
            onNodeHover={setActiveNodeId}
          />
        </div>

        <m.ul
          {...scrollRevealProps}
          viewport={viewport}
          variants={variants(staggerContainer)}
          className={cn(
            'order-2 grid list-none gap-5 p-0',
            'sm:grid-cols-2 sm:gap-6',
          )}
        >
          {capabilities.items.map((item) => (
            <m.li
              key={item.id}
              variants={variants(staggerItem)}
              className="h-full"
              tabIndex={0}
              onMouseEnter={() => setActiveNodeId(item.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              onFocus={() => setActiveNodeId(item.id)}
              onBlur={() => setActiveNodeId(null)}
            >
              <Card
                title={item.title}
                description={item.description}
                icon={item.icon}
                variant="surface"
                className={cn(
                  'h-full transition-colors duration-300',
                  activeNodeId === item.id && 'border-accent-cyan/30',
                )}
              />
            </m.li>
          ))}
        </m.ul>
      </div>
    </SectionShell>
  )
}
