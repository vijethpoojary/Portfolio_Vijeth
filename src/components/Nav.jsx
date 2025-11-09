import { useEffect, memo, useMemo, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function Nav() {
  const [logoError, setLogoError] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const navRef = useRef(null)
  const navLinks = useMemo(
    () => [
      { href: '#hero', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#projects', label: 'Projects' },
      { href: '#experience', label: 'Experience' },
      { href: '#contact', label: 'Contact' },
    ],
    [],
  )

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    if (!isMenuOpen) {
      return undefined
    }

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const ownerDocument = navRef.current?.ownerDocument ?? (typeof document !== 'undefined' ? document : null)
    if (!ownerDocument) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    ownerDocument.addEventListener('keydown', handleKeyDown)
    ownerDocument.addEventListener('pointerdown', handlePointerDown)

    return () => {
      ownerDocument.removeEventListener('keydown', handleKeyDown)
      ownerDocument.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (prefersReducedMotion) return

    const handlePointerDown = (event) => {
      const button = event.target.closest('.btn')
      if (!button) return

      const existingRipple = button.querySelector('.ripple')
      if (existingRipple) existingRipple.remove()

      const rect = button.getBoundingClientRect()
      const ripple = document.createElement('span')

      ripple.className = 'ripple'
      ripple.style.left = `${event.clientX - rect.left}px`
      ripple.style.top = `${event.clientY - rect.top}px`
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })

      button.appendChild(ripple)
    }

    const ownerDocument = navRef.current?.ownerDocument ?? document
    ownerDocument.addEventListener('pointerdown', handlePointerDown)

    return () => ownerDocument.removeEventListener('pointerdown', handlePointerDown)
  }, [prefersReducedMotion])

  return (
    <header ref={navRef} className="nav" role="banner">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Navigate to home" onClick={closeMenu}>
          <div className={`brand-logo${logoError ? ' brand-logo--fallback' : ''}`}>
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Vijeth Poojary logo"
                className="logo-img"
                loading="lazy"
                decoding="async"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span aria-hidden="true">VP</span>
            )}
          </div>
        </Link>
        <button
          type="button"
          className={`nav-toggle${isMenuOpen ? ' nav-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`nav-links${isMenuOpen ? ' nav-links--open' : ''}`}
          aria-label="Primary"
          data-state={isMenuOpen ? 'open' : 'closed'}
        >
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default memo(Nav)
