/** Deterministic constellation layout for the Capabilities section visual */

export const CONSTELLATION_VIEWBOX = '0 0 360 400'

export interface ConstellationNode {
  id: string
  x: number
  y: number
  color: string
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'gene-editing', x: 180, y: 56, color: '#00d4aa' },
  { id: 'protein-design', x: 300, y: 130, color: '#0ea5e9' },
  { id: 'cell-line-dev', x: 300, y: 270, color: '#0ea5e9' },
  { id: 'regulatory-strategy', x: 180, y: 344, color: '#7b61ff' },
  { id: 'assay-dev', x: 60, y: 270, color: '#7b61ff' },
  { id: 'bioinformatics', x: 60, y: 130, color: '#00d4aa' },
]

export interface ConstellationConnection {
  id: string
  d: string
  nodeIds: [string, string]
}

export const CONSTELLATION_CONNECTIONS: ConstellationConnection[] = [
  { id: 'c1', d: 'M 180 56 L 300 130', nodeIds: ['gene-editing', 'protein-design'] },
  { id: 'c2', d: 'M 300 130 L 300 270', nodeIds: ['protein-design', 'cell-line-dev'] },
  { id: 'c3', d: 'M 300 270 L 180 344', nodeIds: ['cell-line-dev', 'regulatory-strategy'] },
  { id: 'c4', d: 'M 180 344 L 60 270', nodeIds: ['regulatory-strategy', 'assay-dev'] },
  { id: 'c5', d: 'M 60 270 L 60 130', nodeIds: ['assay-dev', 'bioinformatics'] },
  { id: 'c6', d: 'M 60 130 L 180 56', nodeIds: ['bioinformatics', 'gene-editing'] },
  { id: 'c7', d: 'M 180 56 L 180 344', nodeIds: ['gene-editing', 'regulatory-strategy'] },
  { id: 'c8', d: 'M 60 130 L 300 270', nodeIds: ['bioinformatics', 'cell-line-dev'] },
  { id: 'c9', d: 'M 300 130 L 60 270', nodeIds: ['protein-design', 'assay-dev'] },
]

export const CONSTELLATION_HUB = { x: 180, y: 200 }

export const CONSTELLATION_ANNOTATIONS = [
  { x: 24, y: 24, label: 'svc.map' },
  { x: 260, y: 388, label: '6 domains' },
] as const

/** Mobile — compact vertical constellation */
export const MOBILE_CONSTELLATION_VIEWBOX = '0 0 280 320'

export const MOBILE_CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'gene-editing', x: 140, y: 40, color: '#00d4aa' },
  { id: 'protein-design', x: 220, y: 100, color: '#0ea5e9' },
  { id: 'bioinformatics', x: 220, y: 200, color: '#00d4aa' },
  { id: 'cell-line-dev', x: 140, y: 260, color: '#0ea5e9' },
  { id: 'assay-dev', x: 60, y: 200, color: '#7b61ff' },
  { id: 'regulatory-strategy', x: 60, y: 100, color: '#7b61ff' },
]

export const MOBILE_CONSTELLATION_CONNECTIONS: ConstellationConnection[] = [
  { id: 'mc1', d: 'M 140 40 L 220 100', nodeIds: ['gene-editing', 'protein-design'] },
  { id: 'mc2', d: 'M 220 100 L 220 200', nodeIds: ['protein-design', 'bioinformatics'] },
  { id: 'mc3', d: 'M 220 200 L 140 260', nodeIds: ['bioinformatics', 'cell-line-dev'] },
  { id: 'mc4', d: 'M 140 260 L 60 200', nodeIds: ['cell-line-dev', 'assay-dev'] },
  { id: 'mc5', d: 'M 60 200 L 60 100', nodeIds: ['assay-dev', 'regulatory-strategy'] },
  { id: 'mc6', d: 'M 60 100 L 140 40', nodeIds: ['regulatory-strategy', 'gene-editing'] },
  { id: 'mc7', d: 'M 140 40 L 140 260', nodeIds: ['gene-editing', 'cell-line-dev'] },
]

export const MOBILE_CONSTELLATION_HUB = { x: 140, y: 150 }

export const MOBILE_CONSTELLATION_VIEWBOX_SIZE = { width: 280, height: 320 }
