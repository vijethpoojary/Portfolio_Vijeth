import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('.nav')
      if (!nav) return
      const scrolled = window.scrollY > 8
      nav.style.background = scrolled
        ? 'linear-gradient(180deg, rgba(10,10,20,0.98), rgba(10,10,20,0.6))'
        : 'linear-gradient(180deg, rgba(10,10,20,0.95), rgba(10,10,20,0.55))'
      nav.style.boxShadow = scrolled ? '0 8px 30px rgba(0, 0, 0, 0.45)' : '0 6px 30px rgba(0, 0, 0, 0.35)'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      const t = e.target.closest('.btn')
      if (!t) return
      const rect = t.getBoundingClientRect()
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.left = e.clientX - rect.left + 'px'
      span.style.top = e.clientY - rect.top + 'px'
      t.appendChild(span)
      setTimeout(() => span.remove(), 600)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">VP</Link>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
