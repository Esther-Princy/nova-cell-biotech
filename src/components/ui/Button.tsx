import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { buttonHover, buttonTap } from '../../animations/variants'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  /** Renders as an anchor when provided */
  href?: string
  /** Opens link in a new tab with security attributes */
  external?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  id?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'border border-accent-cyan bg-accent-cyan text-bg-primary',
    'hover:bg-accent-cyan/90 hover:border-accent-cyan/90',
    'shadow-[0_0_24px_rgb(0_212_170/0.2)] hover:shadow-[0_0_32px_rgb(0_212_170/0.35)]',
  ),
  secondary: cn(
    'border border-accent-cyan/40 bg-transparent text-accent-cyan',
    'hover:border-accent-cyan hover:bg-accent-cyan/10',
  ),
  ghost: cn(
    'border border-transparent bg-transparent text-text-muted',
    'hover:border-border hover:bg-bg-surface hover:text-text-primary',
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 py-2 text-[0.6875rem]',
  md: 'min-h-11 px-6 py-2.5 text-xs',
  lg: 'min-h-12 px-8 py-3 text-sm',
}

const baseStyles = cn(
  'inline-flex items-center justify-center gap-2 rounded-sm',
  'font-display font-semibold uppercase tracking-[0.16em]',
  'transition-colors duration-200',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
  'disabled:pointer-events-none disabled:opacity-50',
)

function isExternalHref(href: string, external?: boolean): boolean {
  return external ?? (href.startsWith('http') || href.startsWith('mailto:'))
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  id,
}: ButtonProps) {
  const { shouldAnimate } = useMotionSafe()
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  const motionProps = {
    whileHover: shouldAnimate && !disabled ? buttonHover : undefined,
    whileTap: shouldAnimate && !disabled ? buttonTap : undefined,
    transition: { duration: 0.15 },
  }

  if (href) {
    const externalLink = isExternalHref(href, external)

    return (
      <m.a
        id={id}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...motionProps}
        {...(externalLink && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {children}
      </m.a>
    )
  }

  return (
    <m.button
      id={id}
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </m.button>
  )
}
