import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, scrollRevealProps } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { cn } from '../../utils/cn'
import Badge from './Badge'

export type SectionHeadingAlign = 'left' | 'center'
export type SectionHeadingSize = 'default' | 'large'

interface SectionHeadingProps {
  /** Eyebrow label rendered as a Badge */
  eyebrow?: string
  title: string
  description?: string
  /** ID applied to the heading element for aria-labelledby */
  titleId?: string
  align?: SectionHeadingAlign
  size?: SectionHeadingSize
  /** Badge visual variant */
  badgeVariant?: 'default' | 'subtle' | 'violet'
  /** Enable scroll-triggered entrance animation */
  animated?: boolean
  className?: string
  /** Optional content below the description */
  children?: ReactNode
}

const alignStyles: Record<SectionHeadingAlign, string> = {
  left: 'text-left items-start',
  center: 'mx-auto text-center items-center',
}

const titleSizeStyles: Record<SectionHeadingSize, string> = {
  default: 'text-3xl md:text-4xl',
  large: 'text-4xl md:text-5xl lg:text-6xl',
}

const descriptionWidthStyles: Record<SectionHeadingAlign, string> = {
  left: 'max-w-2xl',
  center: 'max-w-2xl',
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = 'left',
  size = 'default',
  badgeVariant = 'default',
  animated = true,
  className,
  children,
}: SectionHeadingProps) {
  const { variants } = useMotionSafe()

  const content = (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        alignStyles[align],
        align === 'center' && 'mx-auto',
        className,
      )}
    >
      {eyebrow && <Badge variant={badgeVariant}>{eyebrow}</Badge>}

      <h2
        id={titleId}
        className={cn(
          'font-display font-bold tracking-tight text-text-primary text-balance',
          titleSizeStyles[size],
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'text-base leading-relaxed text-text-muted text-pretty md:text-lg',
            descriptionWidthStyles[align],
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  )

  if (!animated) return content

  return (
    <m.div {...scrollRevealProps} variants={variants(fadeUp)}>
      {content}
    </m.div>
  )
}
