/** Deterministic data for the Impact metrics visual */

export const METRICS_VIEWBOX = '0 0 400 200'

export const METRICS_AXIS = {
  x1: 32,
  y1: 168,
  x2: 368,
  y2: 168,
  yTop: 32,
} as const

export const METRICS_TICKS_Y = [168, 128, 88, 48] as const

export const METRICS_TICKS_X = [32, 120, 208, 296, 368] as const

/** Trend line — upward research output curve */
export const METRICS_TREND_PATH =
  'M 32 148 Q 100 130 160 118 T 280 72 T 368 48'

export const METRICS_AREA_PATH =
  'M 32 148 Q 100 130 160 118 T 280 72 T 368 48 L 368 168 L 32 168 Z'

export const METRICS_ANNOTATIONS = [
  { x: 36, y: 24, label: 'impact.index' },
  { x: 300, y: 24, label: '2019 — 2026' },
] as const

export const METRICS_DATA_POINTS = [
  { x: 32, y: 148 },
  { x: 120, y: 132 },
  { x: 208, y: 108 },
  { x: 296, y: 78 },
  { x: 368, y: 48 },
] as const
