import type { NetworkConnection, NetworkNode, NetworkParticle } from './types'

/** Central biological core — intentionally offset for editorial asymmetry */
export const CORE_POSITION = { x: 215, y: 245 }

/** Deterministic node positions in 480×480 coordinate space */
export const NETWORK_NODES: NetworkNode[] = [
  // Primary research nodes — orbital cluster around core
  { id: 'p1', x: 330, y: 168, tier: 'primary' },
  { id: 'p2', x: 358, y: 262, tier: 'primary' },
  { id: 'p3', x: 288, y: 352, tier: 'primary' },
  { id: 'p4', x: 148, y: 328, tier: 'primary' },
  { id: 'p5', x: 98, y: 212, tier: 'primary' },
  { id: 'p6', x: 172, y: 118, tier: 'primary' },

  // Secondary discovery nodes — extend the network outward
  { id: 's1', x: 398, y: 198, tier: 'secondary' },
  { id: 's2', x: 402, y: 312, tier: 'secondary' },
  { id: 's3', x: 342, y: 388, tier: 'secondary' },
  { id: 's4', x: 68, y: 278, tier: 'secondary' },
  { id: 's5', x: 128, y: 92, tier: 'secondary' },
  { id: 's6', x: 248, y: 408, tier: 'secondary' },
]

/** Connection topology — core-to-primary, primary-to-secondary, selective cross-links */
export const NETWORK_CONNECTIONS: NetworkConnection[] = [
  // Core hub
  { id: 'c-core-p1', from: 'core', to: 'p1', tier: 'primary', curvature: 0.18 },
  { id: 'c-core-p2', from: 'core', to: 'p2', tier: 'primary', curvature: 0.14 },
  { id: 'c-core-p3', from: 'core', to: 'p3', tier: 'primary', curvature: -0.12 },
  { id: 'c-core-p4', from: 'core', to: 'p4', tier: 'primary', curvature: -0.16 },
  { id: 'c-core-p5', from: 'core', to: 'p5', tier: 'primary', curvature: 0.2 },
  { id: 'c-core-p6', from: 'core', to: 'p6', tier: 'primary', curvature: -0.1 },

  // Primary → secondary branches
  { id: 'c-p1-s1', from: 'p1', to: 's1', tier: 'secondary', curvature: 0.1 },
  { id: 'c-p2-s2', from: 'p2', to: 's2', tier: 'secondary', curvature: 0.08 },
  { id: 'c-p3-s3', from: 'p3', to: 's3', tier: 'secondary', curvature: -0.1 },
  { id: 'c-p5-s4', from: 'p5', to: 's4', tier: 'secondary', curvature: 0.15 },
  { id: 'c-p6-s5', from: 'p6', to: 's5', tier: 'secondary', curvature: -0.12 },
  { id: 'c-p3-s6', from: 'p3', to: 's6', tier: 'secondary', curvature: 0.06 },

  // Cross-link — inter-primary intelligence pathway
  { id: 'c-p1-p3', from: 'p1', to: 'p3', tier: 'secondary', curvature: 0.25 },
  { id: 'c-p4-p5', from: 'p4', to: 'p5', tier: 'secondary', curvature: -0.08 },
]

/** Data-flow signals traveling along select connections */
export const NETWORK_PARTICLES: NetworkParticle[] = [
  { id: 'f1', connectionId: 'c-core-p1', duration: 4.2, delay: 0 },
  { id: 'f2', connectionId: 'c-core-p3', duration: 5.0, delay: 1.2 },
  { id: 'f3', connectionId: 'c-p1-s1', duration: 3.6, delay: 0.6 },
  { id: 'f4', connectionId: 'c-p1-p3', duration: 6.0, delay: 2.0 },
  { id: 'f5', connectionId: 'c-core-p5', duration: 4.8, delay: 0.8 },
  { id: 'f6', connectionId: 'c-p5-s4', duration: 3.8, delay: 1.6 },
]

/** Nodes omitted at each density level */
export const DENSITY_HIDDEN_NODES: Record<'full' | 'medium' | 'minimal', string[]> = {
  full: [],
  medium: ['s2', 's6'],
  minimal: ['p6', 's2', 's3', 's5', 's6'],
}

/** Particles omitted at each density level */
export const DENSITY_HIDDEN_PARTICLES: Record<'full' | 'medium' | 'minimal', string[]> = {
  full: [],
  medium: ['f4', 'f6'],
  minimal: ['f3', 'f4', 'f5', 'f6'],
}

/** Build a quadratic bezier path between two coordinates */
export function createBezierPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  curvature: number,
): string {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const ctrlX = midX - dy * curvature
  const ctrlY = midY + dx * curvature
  return `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`
}

/** Resolve node coordinates by ID (core is a virtual node) */
export function getNodePosition(
  id: string,
  nodes: NetworkNode[],
  core = CORE_POSITION,
): { x: number; y: number } | null {
  if (id === 'core') return core
  const node = nodes.find((n) => n.id === id)
  return node ? { x: node.x, y: node.y } : null
}
