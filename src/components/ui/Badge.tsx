import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type BadgeVariant = 'default' | 'subtle' | 'violet'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan',
  subtle: 'border-border bg-bg-surface text-text-muted',
  violet: 'border-accent-violet/30 bg-accent-violet/10 text-accent-violet',
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border px-3 py-1',
        'font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
