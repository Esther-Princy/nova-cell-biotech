import { m } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { cn } from '../../utils/cn'

export type CardVariant = 'default' | 'surface'

interface CardProps {
  title: string
  description?: string
  icon?: LucideIcon
  variant?: CardVariant
  /** Enables subtle hover lift and border glow */
  interactive?: boolean
  className?: string
  children?: ReactNode
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-bg-elevated border-border',
  surface: 'bg-bg-surface border-border-subtle',
}

export default function Card({
  title,
  description,
  icon: Icon,
  variant = 'default',
  interactive = true,
  className,
  children,
}: CardProps) {
  const { shouldAnimate } = useMotionSafe()

  return (
    <m.article
      className={cn(
        'group relative flex h-full flex-col rounded-sm border p-6 md:p-7',
        'transition-colors duration-300',
        interactive && 'hover:border-accent-cyan/30',
        variantStyles[variant],
        className,
      )}
      whileHover={
        interactive && shouldAnimate
          ? { y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } }
          : undefined
      }
    >
      {Icon && (
        <div
          className={cn(
            'mb-5 flex h-11 w-11 items-center justify-center rounded-sm',
            'border border-border bg-bg-surface text-accent-cyan',
            'transition-colors duration-300 group-hover:border-accent-cyan/30',
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      )}

      <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
        {title}
      </h3>

      {description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted text-pretty">
          {description}
        </p>
      )}

      {children}
    </m.article>
  )
}
