import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import {
  CORE_POSITION,
  DENSITY_HIDDEN_NODES,
  DENSITY_HIDDEN_PARTICLES,
  NETWORK_CONNECTIONS,
  NETWORK_NODES,
  NETWORK_PARTICLES,
  createBezierPath,
  getNodePosition,
} from './molecularData'
import type {
  ConnectionPath,
  NetworkConfig,
  NetworkDensity,
} from './types'

function resolveDensity(isDesktop: boolean, isTablet: boolean): NetworkDensity {
  if (isDesktop) return 'full'
  if (isTablet) return 'medium'
  return 'minimal'
}

function filterNetwork(density: NetworkDensity): NetworkConfig {
  const hiddenNodes = new Set(DENSITY_HIDDEN_NODES[density])
  const hiddenParticles = new Set(DENSITY_HIDDEN_PARTICLES[density])

  const nodes = NETWORK_NODES.filter((n) => !hiddenNodes.has(n.id))
  const visibleNodeIds = new Set([...nodes.map((n) => n.id), 'core'])

  const connections = NETWORK_CONNECTIONS.filter(
    (c) => visibleNodeIds.has(c.from) && visibleNodeIds.has(c.to),
  )

  const particles = NETWORK_PARTICLES.filter(
    (p) =>
      !hiddenParticles.has(p.id) &&
      connections.some((c) => c.id === p.connectionId),
  )

  return {
    nodes,
    connections,
    particles,
    core: CORE_POSITION,
    viewBox: '0 0 480 480',
  }
}

function buildConnectionPaths(config: NetworkConfig): ConnectionPath[] {
  return config.connections
    .map((connection) => {
      const from = getNodePosition(connection.from, config.nodes, config.core)
      const to = getNodePosition(connection.to, config.nodes, config.core)
      if (!from || !to) return null

      return {
        id: connection.id,
        d: createBezierPath(from, to, connection.curvature),
        tier: connection.tier,
      }
    })
    .filter((path): path is ConnectionPath => path !== null)
}

export function useNetworkConfig(): NetworkConfig & { paths: ConnectionPath[] } {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 640px)')

  const density = resolveDensity(isDesktop, isTablet)

  return useMemo(() => {
    const config = filterNetwork(density)
    const paths = buildConnectionPaths(config)
    return { ...config, paths }
  }, [density])
}

export function useNetworkDensity(): NetworkDensity {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 640px)')
  const [density, setDensity] = useState<NetworkDensity>(() =>
    resolveDensity(isDesktop, isTablet),
  )

  useEffect(() => {
    setDensity(resolveDensity(isDesktop, isTablet))
  }, [isDesktop, isTablet])

  return density
}

export { buildConnectionPaths }
