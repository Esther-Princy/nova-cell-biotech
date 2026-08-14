export type NodeTier = 'primary' | 'secondary'
export type ConnectionTier = 'primary' | 'secondary'
export type NetworkDensity = 'full' | 'medium' | 'minimal'

export interface NetworkNode {
  id: string
  x: number
  y: number
  tier: NodeTier
}

export interface NetworkConnection {
  id: string
  from: string
  to: string
  tier: ConnectionTier
  /** Bezier curvature factor — deterministic per connection */
  curvature: number
}

export interface NetworkParticle {
  id: string
  connectionId: string
  duration: number
  delay: number
}

export interface NetworkConfig {
  nodes: NetworkNode[]
  connections: NetworkConnection[]
  particles: NetworkParticle[]
  core: { x: number; y: number }
  viewBox: string
}

export interface ConnectionPath {
  id: string
  d: string
  tier: ConnectionTier
}
