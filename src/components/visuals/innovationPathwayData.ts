/** Deterministic pathway visual data for the Innovation section */

export const PATHWAY_VIEWBOX = '0 0 400 440'

export const GRID_LINES = {
  vertical: [80, 160, 240, 320],
  horizontal: [80, 160, 240, 320, 360],
} as const

export const PATHWAY_HUB = { x: 188, y: 228 }

export const PATHWAY_BRANCHES = [
  {
    id: 'branch-genomics',
    d: 'M 188 228 Q 248 168 310 118',
    node: { x: 310, y: 118 },
    marker: '01',
    color: '#00d4aa',
  },
  {
    id: 'branch-engineering',
    d: 'M 188 228 Q 128 188 72 148',
    node: { x: 72, y: 148 },
    marker: '02',
    color: '#0ea5e9',
  },
  {
    id: 'branch-therapeutics',
    d: 'M 188 228 Q 210 310 248 372',
    node: { x: 248, y: 372 },
    marker: '03',
    color: '#7b61ff',
  },
] as const

/** Maps innovation pillar IDs to pathway branch IDs */
export const PILLAR_BRANCH_MAP: Record<string, string> = {
  'computational-genomics': 'branch-genomics',
  'cellular-engineering': 'branch-engineering',
  'precision-therapeutics': 'branch-therapeutics',
}

export const PATHWAY_VIEWBOX_SIZE = { width: 400, height: 440 }

export const PRECISION_MARKERS = [
  { x: 48, y: 48, label: 'Δ' },
  { x: 352, y: 56, label: 'Σ' },
  { x: 56, y: 392, label: 'λ' },
  { x: 344, y: 384, label: 'θ' },
] as const

export const ORBITAL_ARC =
  'M 120 340 A 140 140 0 0 1 320 100'

export const ANNOTATION_LINES = [
  { x1: 48, y1: 400, x2: 120, y2: 400 },
  { x1: 280, y1: 48, x2: 352, y2: 48 },
] as const
