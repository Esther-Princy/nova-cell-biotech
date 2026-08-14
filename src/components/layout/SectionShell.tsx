import type { ReactNode } from 'react'
import { useSectionNavigation } from '../../hooks/useSectionNavigation'
import { cn } from '../../utils/cn'
import type { SectionId } from '../../constants/content'

interface SectionShellProps {
  id: SectionId | string
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
  const { arrivalSectionId } = useSectionNavigation()
  const isArriving = arrivalSectionId === id

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      data-arrival={isArriving ? 'true' : undefined}
      className={cn(
        'section-padding scroll-mt-20 lg:scroll-mt-24',
        isArriving && 'section-arrival',
        className,
      )}
    >
      <div className={cn('container-default', containerClassName)}>
        {children}
      </div>
    </section>
  )
}
