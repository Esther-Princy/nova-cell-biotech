import { useTransform, type MotionValue } from 'framer-motion'

interface ViewBoxSize {
  width: number
  height: number
}

/**
 * Computes 0–1 proximity of pointer to an SVG node without React re-renders.
 */
export function useNodeProximity(
  pointerX: MotionValue<number>,
  pointerY: MotionValue<number>,
  isActive: MotionValue<number>,
  nodeX: number,
  nodeY: number,
  viewBox: ViewBoxSize,
  radius = 80,
  enabled = true,
): MotionValue<number> {
  return useTransform([pointerX, pointerY, isActive], ([px, py, active]) => {
    if (!enabled || !active) return 0
    const pxv = (px as number) * viewBox.width
    const pyv = (py as number) * viewBox.height
    const dist = Math.hypot(pxv - nodeX, pyv - nodeY)
    return Math.max(0, 1 - dist / radius)
  })
}

export function useGroupParallax(
  parallaxX: MotionValue<number>,
  parallaxY: MotionValue<number>,
  strength = 1,
): MotionValue<string> {
  return useTransform(
    [parallaxX, parallaxY],
    ([x, y]) => `translate(${(x as number) * strength}px, ${(y as number) * strength}px)`,
  )
}
