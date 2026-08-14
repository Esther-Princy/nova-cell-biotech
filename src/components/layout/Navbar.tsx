import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import {
  mobileNavPanel,
  staggerContainerFast,
  staggerItem,
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

  /*
   * Lock the page behind the mobile navigation.
   * This prevents the Research / Impact sections from
   * scrolling underneath the open menu.
   */
  useBodyScrollLock(menuOpen && !isDesktop)

  /*
   * Keep keyboard focus inside the mobile menu.
   */
  useFocusTrap(menuPanelRef, menuOpen && !isDesktop)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)

    /*
     * Return focus to the hamburger button after closing.
     */
    menuButtonRef.current?.focus()
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const handleNavigate = useCallback(() => {
    if (!isDesktop) {
      closeMenu()
    }
  }, [isDesktop, closeMenu])

  /*
   * Automatically close the mobile menu when
   * switching to desktop width.
   */
  useEffect(() => {
    if (isDesktop && menuOpen) {
      setMenuOpen(false)
    }
  }, [isDesktop, menuOpen])

  /*
   * Escape key closes the mobile navigation.
   */
  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen, closeMenu])

  return (
    <>
      {/* =========================================================
          DESKTOP / MOBILE HEADER
          ========================================================= */}

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,border-color,backdrop-filter]',
          'duration-500',
          scrolled
            ? 'border-b border-border/80 bg-bg-primary/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Main navigation"
          className="container-default flex h-16 items-center justify-between lg:h-20"
        >
          {/* Brand */}
          <BrandLogo name={brand.name} />

          {/* =====================================================
              DESKTOP NAVIGATION
              ===================================================== */}

          <div className="hidden items-center gap-10 lg:flex">
            <m.ul
              className="flex items-center gap-8"
              variants={variants(staggerContainerFast)}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => (
                <m.li
                  key={link.href}
                  variants={variants(staggerItem)}
                >
                  <NavLinkItem
                    link={link}
                    variant="desktop"
                  />
                </m.li>
              ))}
            </m.ul>

            <NavCTAButton link={NAV_CTA} />
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
              ===================================================== */}

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              'relative flex h-11 w-11 items-center justify-center rounded-sm lg:hidden',
              'text-text-primary transition-colors',
              'hover:text-accent-cyan',
              'focus-visible:outline-2',
              'focus-visible:outline-offset-2',
              'focus-visible:outline-focus-ring',
            )}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={
              menuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X
                className="h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="h-5 w-5"
                aria-hidden="true"
              />
            )}
          </button>
        </nav>
      </header>

      {/* =========================================================
          MOBILE NAVIGATION OVERLAY
          ========================================================= */}

      <AnimatePresence>
        {menuOpen && !isDesktop && (
          <div
            className={cn(
              /*
               * IMPORTANT:
               * The overlay starts BELOW the fixed navbar.
               * This prevents the menu from covering the header.
               */
              'fixed inset-x-0 top-16 bottom-0',
              'z-[100] lg:hidden',
            )}
            aria-hidden={false}
          >
            {/* ===================================================
                BACKDROP
                =================================================== */}

            <m.button
              type="button"
              aria-label="Close navigation menu"
              className={cn(
                'absolute inset-0 border-0',
                'bg-bg-primary/90',
                'backdrop-blur-sm',
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* ===================================================
                MOBILE MENU PANEL
                =================================================== */}

            <m.div
              ref={menuPanelRef}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cn(
                /*
                 * The panel itself sits at the top of the
                 * overlay, which already starts at top-16.
                 */
                'absolute right-0 top-0 bottom-0',
                'z-[101]',
                'flex w-full flex-col',

                /*
                 * Visual styling
                 */
                'border-l border-border',
                'bg-bg-elevated',
                'shadow-[0_0_60px_rgb(0_0_0/0.55)]',

                /*
                 * Tablet width
                 */
                'sm:max-w-sm',

                /*
                 * Prevent visual content from escaping
                 */
                'overflow-hidden',
              )}
              variants={variants(mobileNavPanel)}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              {/* =================================================
                  TOP ACCENT LINE
                  ================================================= */}

              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-x-0 top-0',
                  'h-px',
                  'bg-gradient-to-r',
                  'from-transparent',
                  'via-accent-cyan/60',
                  'to-transparent',
                )}
              />

              {/* =================================================
                  AMBIENT GLOW
                  ================================================= */}

              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute',
                  '-right-24 -top-24',
                  'h-64 w-64',
                  'rounded-full',
                  'bg-accent-cyan/5',
                  'blur-3xl',
                )}
              />

              {/* =================================================
                  MENU CONTENT
                  ================================================= */}

              <div
                className={cn(
                  'relative flex flex-1 flex-col',
                  'justify-between',
                  'overflow-y-auto',
                  'px-6 py-10',
                  'sm:px-8',
                )}
              >
                {/* =================================================
                    NAVIGATION LINKS
                    ================================================= */}

                <div>
                  <p
                    className={cn(
                      'mb-8',
                      'font-display text-[10px]',
                      'uppercase tracking-[0.3em]',
                      'text-text-subtle',
                    )}
                  >
                    Navigation
                  </p>

                  <m.ul
                    className="flex flex-col gap-6"
                    variants={variants(staggerContainerFast)}
                    initial="hidden"
                    animate="visible"
                  >
                    {NAV_LINKS.map((link) => (
                      <m.li
                        key={link.href}
                        variants={variants(staggerItem)}
                      >
                        <NavLinkItem
                          link={link}
                          variant="mobile"
                          onNavigate={handleNavigate}
                        />
                      </m.li>
                    ))}
                  </m.ul>
                </div>

                {/* =================================================
                    CTA + TAGLINE
                    ================================================= */}

                <div
                  className={cn(
                    'mt-12',
                    'border-t border-border',
                    'pt-8',
                  )}
                >
                  <NavCTAButton
                    link={NAV_CTA}
                    onNavigate={handleNavigate}
                    className="w-full text-center"
                  />

                  <p
                    className={cn(
                      'mt-6',
                      'font-display text-xs',
                      'uppercase tracking-[0.2em]',
                      'text-text-subtle',
                    )}
                  >
                    {brand.tagline}
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}