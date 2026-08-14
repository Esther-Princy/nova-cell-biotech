export interface PipelineStageLayout {
  id: string
  x: number
  y: number
  color: string
  annotation?: string
}

export interface PipelineSegment {
  id: string
  d: string
  color: string
}

export interface PipelineParticle {
  id: string
  segmentId: string
  duration: number
  delay: number
}

export interface PipelineLayout {
  viewBox: string
  stages: PipelineStageLayout[]
  segments: PipelineSegment[]
  particles: PipelineParticle[]
  baseline: string
}

const STAGE_COLORS = ['#00d4aa', '#0ea5e9', '#0ea5e9', '#7b61ff', '#7b61ff'] as const

/** Desktop — horizontal pipeline */
export const DESKTOP_PIPELINE: PipelineLayout = {
  viewBox: '0 0 720 240',
  baseline: 'M 48 120 L 672 120',
  stages: [
    { id: 'signal', x: 56, y: 120, color: STAGE_COLORS[0], annotation: 'λ 340nm' },
    { id: 'design', x: 200, y: 120, color: STAGE_COLORS[1], annotation: 'ΔG −4.2' },
    { id: 'engineer', x: 360, y: 120, color: STAGE_COLORS[2], annotation: 'seq: 4.2kb' },
    { id: 'validate', x: 520, y: 120, color: STAGE_COLORS[3], annotation: 'n = 10⁴' },
    { id: 'deploy', x: 664, y: 120, color: STAGE_COLORS[4], annotation: 'IND-ready' },
  ],
  segments: [
    { id: 'seg-signal-design', d: 'M 56 120 Q 128 88 200 120', color: STAGE_COLORS[0] },
    { id: 'seg-design-engineer', d: 'M 200 120 Q 280 152 360 120', color: STAGE_COLORS[1] },
    { id: 'seg-engineer-validate', d: 'M 360 120 Q 440 88 520 120', color: STAGE_COLORS[2] },
    { id: 'seg-validate-deploy', d: 'M 520 120 Q 592 152 664 120', color: STAGE_COLORS[3] },
  ],
  particles: [
    { id: 'p1', segmentId: 'seg-signal-design', duration: 3.8, delay: 0 },
    { id: 'p2', segmentId: 'seg-engineer-validate', duration: 4.4, delay: 1.2 },
    { id: 'p3', segmentId: 'seg-validate-deploy', duration: 3.6, delay: 0.6 },
  ],
}

/** Mobile — vertical simplified pipeline */
export const MOBILE_PIPELINE: PipelineLayout = {
  viewBox: '0 0 280 520',
  baseline: 'M 140 48 L 140 472',
  stages: [
    { id: 'signal', x: 140, y: 56, color: STAGE_COLORS[0] },
    { id: 'design', x: 140, y: 152, color: STAGE_COLORS[1] },
    { id: 'engineer', x: 140, y: 248, color: STAGE_COLORS[2] },
    { id: 'validate', x: 140, y: 344, color: STAGE_COLORS[3] },
    { id: 'deploy', x: 140, y: 440, color: STAGE_COLORS[4] },
  ],
  segments: [
    { id: 'seg-signal-design', d: 'M 140 56 L 140 152', color: STAGE_COLORS[0] },
    { id: 'seg-design-engineer', d: 'M 140 152 L 140 248', color: STAGE_COLORS[1] },
    { id: 'seg-engineer-validate', d: 'M 140 248 L 140 344', color: STAGE_COLORS[2] },
    { id: 'seg-validate-deploy', d: 'M 140 344 L 140 440', color: STAGE_COLORS[3] },
  ],
  particles: [
    { id: 'p1', segmentId: 'seg-signal-design', duration: 3.2, delay: 0 },
    { id: 'p2', segmentId: 'seg-validate-deploy', duration: 3.8, delay: 0.8 },
  ],
}

export const PIPELINE_GRID_DESKTOP = {
  horizontal: [120, 180],
  vertical: [200, 360, 520],
} as const

export const COORD_ANNOTATIONS = [
  { x: 48, y: 28, label: 'pipeline.v2' },
  { x: 580, y: 28, label: 'coord: 40.7128° N' },
  { x: 48, y: 220, label: 'throughput: active' },
] as const
