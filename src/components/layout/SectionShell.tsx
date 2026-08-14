import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface SectionShellProps {
  id: string
  /** ID of the heading element that labels this section */
  ariaLabelledBy?: string
  className?: string
  containerClassName?: string
  children: ReactNode
}

export default function SectionShell({
  id,
  ariaLabelledBy,
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('section-padding scroll-mt-20 lg:scroll-mt-24', className)}
    >
      <div className={cn('container-default', containerClassName)}>
        {children}
      </div>
    </section>
  )
}
