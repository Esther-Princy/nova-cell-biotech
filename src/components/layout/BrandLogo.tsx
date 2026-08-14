import { SECTION_IDS } from '../../constants/content'

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 shrink-0 text-accent-cyan"
      fill="none"
    >
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="10" cy="3" r="1.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="14" r="1.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="4" cy="14" r="1.5" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="5" x2="10" y2="8" stroke="currentColor" strokeWidth="0.75" />
      <line x1="11.5" y1="11.5" x2="14.5" y2="12.5" stroke="currentColor" strokeWidth="0.75" />
      <line x1="8.5" y1="11.5" x2="5.5" y2="12.5" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

interface BrandLogoProps {
  name: string
  className?: string
}

export default function BrandLogo({ name, className }: BrandLogoProps) {
  return (
    <a
      href={`#${SECTION_IDS.hero}`}
      className={className}
      aria-label={`${name} — return to top`}
    >
      <span className="flex items-center gap-2.5">
        <BrandMark />
        <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-text-primary">
          {name}
        </span>
      </span>
    </a>
  )
}
