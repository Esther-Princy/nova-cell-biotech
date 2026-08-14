import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  mountRevealProps,
  navReveal,
  staggerContainerFast,
  staggerItem,
  menuSlide,
} from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { SITE_CONTENT } from '../../constants/content'
import { NAV_CTA, NAV_LINKS } from '../../constants/navigation'
import { useBodyScrollLock, useFocusTrap } from '../../hooks/useFocusTrap'
import { useIsDesktopNav } from '../../hooks/useMediaQuery'
import { useScrollState } from '../../hooks/useScrollState'
import { cn } from '../../utils/cn'
import BrandLogo from './BrandLogo'
import NavLinkItem, { NavCTAButton } from './NavLinkItem'

export default function Navbar() {
  const { brand } = SITE_CONTENT
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollState(24)
  const isDesktop = useIsDesktopNav()
  const { variants } = useMotionSafe()

  useBodyScrollLock(menuOpen && !isDesktop)
  useFocusTrap(menuPanelRef, menuOpen && !isDesktop)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const handleNavigate = useCallback(() => {
    if (!isDesktop) closeMenu()
  }, [isDesktop, closeMenu])

  useEffect(() => {
    if (isDesktop && menuOpen) setMenuOpen(false)
  }, [isDesktop, menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen, closeMenu])

  return (
    <m.header
      {...mountRevealProps}
      variants={variants(navReveal)}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-b border-border/80 bg-bg-primary/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Main navigation"
        className="container-default flex h-16 items-center justify-between lg:h-20"
      >
        <BrandLogo name={brand.name} />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <m.ul
            className="flex items-center gap-8"
            variants={variants(staggerContainerFast)}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link) => (
              <m.li key={link.href} variants={variants(staggerItem)}>
                <NavLinkItem link={link} variant="desktop" />
              </m.li>
            ))}
          </m.ul>
          <NavCTAButton link={NAV_CTA} />
        </div>

        {/* Mobile / tablet menu toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          className={cn(
            'relative flex h-11 w-11 items-center justify-center rounded-sm lg:hidden',
            'text-text-primary transition-colors hover:text-accent-cyan',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
          )}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile / tablet menu overlay */}
      <AnimatePresence>
        {menuOpen && !isDesktop && (
          <>
            <m.div
              aria-hidden="true"
              className="fixed inset-0 top-16 bg-bg-primary/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            <m.div
              ref={menuPanelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cn(
                'fixed inset-y-0 right-0 top-16 z-50 flex w-full flex-col',
                'border-l border-border bg-bg-elevated/95 backdrop-blur-xl sm:max-w-sm',
              )}
              variants={variants(menuSlide)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-1 flex-col justify-between px-6 py-10 sm:px-8">
                <m.ul
                  className="flex flex-col gap-6"
                  variants={variants(staggerContainerFast)}
                  initial="hidden"
                  animate="visible"
                >
                  {NAV_LINKS.map((link) => (
                    <m.li key={link.href} variants={variants(staggerItem)}>
                      <NavLinkItem
                        link={link}
                        variant="mobile"
                        onNavigate={handleNavigate}
                      />
                    </m.li>
                  ))}
                </m.ul>

                <div className="mt-12 border-t border-border pt-8">
                  <NavCTAButton
                    link={NAV_CTA}
                    onNavigate={handleNavigate}
                    className="w-full text-center"
                  />
                  <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-text-subtle">
                    {brand.tagline}
                  </p>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </m.header>
  )
}
