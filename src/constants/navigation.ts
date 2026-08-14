import type { NavLink } from '../types'
import { SECTION_IDS } from './content'

export const NAV_LINKS: NavLink[] = [
  { label: 'Innovation', href: `#${SECTION_IDS.innovation}` },
  { label: 'Research', href: `#${SECTION_IDS.research}` },
  { label: 'Capabilities', href: `#${SECTION_IDS.capabilities}` },
  { label: 'Impact', href: `#${SECTION_IDS.impact}` },
]

export const NAV_CTA: NavLink = {
  label: 'Contact',
  href: `#${SECTION_IDS.contact}`,
}

export const FOOTER_NAV_LINKS: NavLink[] = [
  ...NAV_LINKS,
  NAV_CTA,
]
