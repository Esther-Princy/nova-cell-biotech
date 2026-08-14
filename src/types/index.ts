import type { LucideIcon } from 'lucide-react'

/** Shared navigation link shape */
export interface NavLink {
  label: string
  href: string
}

/** Section eyebrow badge + heading pattern */
export interface SectionHeadingContent {
  eyebrow: string
  title: string
  description?: string
}

/** Reusable card content for capabilities, innovation pillars, etc. */
export interface CardContent {
  id: string
  icon?: LucideIcon
  title: string
  description: string
}

/** Research / technology pipeline step */
export interface ResearchStep {
  id: string
  phase: string
  /** Short pipeline code shown in the visual (e.g. SIGNAL) */
  code: string
  title: string
  description: string
  icon?: LucideIcon
}

/** Animated statistic for Impact section */
export interface StatItem {
  id: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

/** Call-to-action button configuration */
export interface CTAConfig {
  label: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

/** Hero section content bundle */
export interface HeroContent {
  eyebrow: string
  headline: string
  headlineAccent: string
  tagline: string
  description: string
  primaryCTA: CTAConfig
  secondaryCTA: CTAConfig
}

/** Footer link group */
export interface FooterLinkGroup {
  title: string
  links: NavLink[]
}

/** Site-wide brand constants */
export interface BrandConfig {
  name: string
  tagline: string
  copyright: string
}

/** Complete site content model */
export interface SiteContent {
  brand: BrandConfig
  hero: HeroContent
  innovation: SectionHeadingContent & { pillars: CardContent[] }
  research: SectionHeadingContent & { steps: ResearchStep[] }
  capabilities: SectionHeadingContent & { items: CardContent[] }
  impact: SectionHeadingContent & { stats: StatItem[] }
  finalCTA: SectionHeadingContent & { primaryCTA: CTAConfig; secondaryCTA?: CTAConfig }
  footer: {
    description: string
    linkGroups: FooterLinkGroup[]
    social: NavLink[]
  }
}

/** Framer Motion variant state keys used across the animation system */
export type MotionState = 'hidden' | 'visible' | 'exit'

/** Standard viewport config for scroll-triggered animations */
export interface InViewConfig {
  once?: boolean
  margin?: string
  amount?: number | 'some' | 'all'
}
