import { m } from 'framer-motion'
import type { NavLink } from '../../types'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { cn } from '../../utils/cn'

interface NavLinkItemProps {
  link: NavLink
  variant?: 'desktop' | 'mobile'
  onNavigate?: () => void
  className?: string
}

export default function NavLinkItem({
  link,
  variant = 'desktop',
  onNavigate,
  className,
}: NavLinkItemProps) {
  const { shouldAnimate } = useMotionSafe()

  const baseStyles =
    variant === 'desktop'
      ? 'font-display text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-text-muted transition-colors duration-200 hover:text-text-primary'
      : 'font-display text-3xl font-semibold tracking-tight text-text-primary transition-colors duration-200 hover:text-accent-cyan sm:text-4xl'

  const handleClick = () => {
    onNavigate?.()
  }

  return (
    <a
      href={link.href}
      className={cn('group relative inline-flex items-center py-2', baseStyles, className)}
      onClick={handleClick}
    >
      <span>{link.label}</span>
      {variant === 'desktop' && (
        <m.span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent-cyan"
          initial={{ scaleX: 0 }}
          whileHover={shouldAnimate ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </a>
  )
}

interface NavCTAButtonProps {
  link: NavLink
  onNavigate?: () => void
  className?: string
}

export function NavCTAButton({ link, onNavigate, className }: NavCTAButtonProps) {
  const { shouldAnimate } = useMotionSafe()

  return (
    <m.a
      href={link.href}
      className={cn(
        'inline-flex items-center justify-center rounded-sm border border-accent-cyan/40 px-5 py-2.5',
        'font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em]',
        'text-accent-cyan transition-colors duration-200',
        'hover:border-accent-cyan hover:bg-accent-cyan/10',
        className,
      )}
      onClick={onNavigate}
      whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15 }}
    >
      {link.label}
    </m.a>
  )
}
