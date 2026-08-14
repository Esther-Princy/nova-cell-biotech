/** Deterministic convergence visual for the Final CTA section */

export const CTA_VISUAL_VIEWBOX = '0 0 420 380'

export const CTA_GATEWAY = { x: 210, y: 190 }

export const CTA_OUTER_NODES = [
  { id: 'n1', x: 210, y: 48, color: '#00d4aa' },
  { id: 'n2', x: 348, y: 118, color: '#0ea5e9' },
  { id: 'n3', x: 348, y: 262, color: '#7b61ff' },
  { id: 'n4', x: 72, y: 262, color: '#7b61ff' },
  { id: 'n5', x: 72, y: 118, color: '#0ea5e9' },
] as const

export const CTA_CONVERGENCE_PATHS = [
  { id: 'p1', d: 'M 210 48 Q 210 110 210 190', color: '#00d4aa' },
  { id: 'p2', d: 'M 348 118 Q 290 145 210 190', color: '#0ea5e9' },
  { id: 'p3', d: 'M 348 262 Q 290 235 210 190', color: '#7b61ff' },
  { id: 'p4', d: 'M 72 262 Q 130 235 210 190', color: '#7b61ff' },
  { id: 'p5', d: 'M 72 118 Q 130 145 210 190', color: '#0ea5e9' },
] as const

export const CTA_ORBITAL_RING =
  'M 210 190 m -120 0 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0'

export const CTA_INNER_RING =
  'M 210 190 m -64 0 a 64 64 0 1 0 128 0 a 64 64 0 1 0 -128 0'

export const CTA_ANNOTATIONS = [
  { x: 36, y: 28, label: 'gateway.protocol' },
  { x: 280, y: 360, label: 'initiate →' },
] as const

/** Mobile compact layout */
export const CTA_MOBILE_VIEWBOX = '0 0 320 300'

export const CTA_MOBILE_GATEWAY = { x: 160, y: 150 }

export const CTA_MOBILE_NODES = [
  { id: 'n1', x: 160, y: 40, color: '#00d4aa' },
  { id: 'n2', x: 260, y: 100, color: '#0ea5e9' },
  { id: 'n3', x: 260, y: 200, color: '#7b61ff' },
  { id: 'n4', x: 60, y: 200, color: '#7b61ff' },
  { id: 'n5', x: 60, y: 100, color: '#0ea5e9' },
] as const

export const CTA_MOBILE_PATHS = [
  { id: 'p1', d: 'M 160 40 L 160 150', color: '#00d4aa' },
  { id: 'p2', d: 'M 260 100 Q 210 120 160 150', color: '#0ea5e9' },
  { id: 'p3', d: 'M 260 200 Q 210 180 160 150', color: '#7b61ff' },
  { id: 'p4', d: 'M 60 200 Q 110 180 160 150', color: '#7b61ff' },
  { id: 'p5', d: 'M 60 100 Q 110 120 160 150', color: '#0ea5e9' },
] as const

export const CTA_MOBILE_ORBITAL =
  'M 160 150 m -90 0 a 90 90 0 1 0 180 0 a 90 90 0 1 0 -180 0'
