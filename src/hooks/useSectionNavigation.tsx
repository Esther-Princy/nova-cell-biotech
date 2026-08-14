import { useReducedMotion } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SECTION_IDS, type SectionId } from '../constants/content'

type ArrivalHandler = () => void

interface SectionNavigationContextValue {
  arrivalSectionId: SectionId | null
  navigateToSection: (sectionId: SectionId) => void
  navigateToHref: (href: string) => boolean
  registerArrivalHandler: (sectionId: SectionId, handler: ArrivalHandler) => () => void
}

const ARRIVAL_DURATION_MS = 1200

const SectionNavigationContext = createContext<SectionNavigationContextValue | null>(null)

export function hrefToSectionId(href: string): SectionId | null {
  if (!href.startsWith('#')) return null
  const id = href.slice(1)
  return (Object.values(SECTION_IDS) as string[]).includes(id) ? (id as SectionId) : null
}

export function SectionNavigationProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion() ?? false
  const [arrivalSectionId, setArrivalSectionId] = useState<SectionId | null>(null)
  const handlersRef = useRef<Map<SectionId, ArrivalHandler>>(new Map())
  const clearTimerRef = useRef<number | null>(null)

  const registerArrivalHandler = useCallback((sectionId: SectionId, handler: ArrivalHandler) => {
    handlersRef.current.set(sectionId, handler)
    return () => {
      handlersRef.current.delete(sectionId)
    }
  }, [])

  const triggerArrival = useCallback((sectionId: SectionId) => {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current)
    }

    setArrivalSectionId(sectionId)
    handlersRef.current.get(sectionId)?.()

    clearTimerRef.current = window.setTimeout(() => {
      setArrivalSectionId(null)
      clearTimerRef.current = null
    }, ARRIVAL_DURATION_MS)
  }, [])

  const navigateToSection = useCallback(
    (sectionId: SectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      let arrived = false
      const runArrivalOnce = () => {
        if (arrived) return
        arrived = true
        triggerArrival(sectionId)
      }

      if (prefersReducedMotion) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' })
        runArrivalOnce()
        return
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      const fallbackTimer = window.setTimeout(runArrivalOnce, 900)

      if ('onscrollend' in window) {
        const onScrollEnd = () => {
          window.clearTimeout(fallbackTimer)
          runArrivalOnce()
        }
        window.addEventListener('scrollend', onScrollEnd, { once: true })
      }
    },
    [prefersReducedMotion, triggerArrival],
  )

  const navigateToHref = useCallback(
    (href: string) => {
      const sectionId = hrefToSectionId(href)
      if (!sectionId) return false
      navigateToSection(sectionId)
      return true
    },
    [navigateToSection],
  )

  useEffect(() => {
    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current)
      }
    }
  }, [])

  return (
    <SectionNavigationContext.Provider
      value={{
        arrivalSectionId,
        navigateToSection,
        navigateToHref,
        registerArrivalHandler,
      }}
    >
      {children}
    </SectionNavigationContext.Provider>
  )
}

export function useSectionNavigation(): SectionNavigationContextValue {
  const context = useContext(SectionNavigationContext)
  if (!context) {
    throw new Error('useSectionNavigation must be used within SectionNavigationProvider')
  }
  return context
}
