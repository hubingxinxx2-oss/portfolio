import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site.js'

const links = [
  { id: 'about', label: '经历' },
  { id: 'projects', label: '作品' },
  { id: 'skills', label: '优势' },
  { id: 'contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          setScrolled(window.scrollY > 24)
        })
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const ids = links.map((l) => l.id)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link className="nav__brand" to={onHome ? '#home' : '/#home'} aria-label="返回首页">
          <span className="nav__brand-name">{site.name}</span>
          <span className="nav__brand-en">{site.enName}</span>
        </Link>

        <nav className="nav__links" aria-label="主导航">
          {links.map((link) => (
            <Link
              key={link.id}
              to={onHome ? `#${link.id}` : `/#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className={`nav__link ${pathname === '/portfolio' ? 'is-active' : ''}`}
            to="/portfolio"
          >
            作品集
          </Link>
        </nav>

        <Link className="btn btn--primary btn--sm nav__cta" to={onHome ? '#contact' : '/#contact'}>
          联系我
        </Link>
        <button
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`nav__panel ${menuOpen ? 'is-open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.id}
            to={onHome ? `#${link.id}` : `/#${link.id}`}
            className={`nav__panel-link ${active === link.id ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          className={`nav__panel-link ${pathname === '/portfolio' ? 'is-active' : ''}`}
          to="/portfolio"
          onClick={() => setMenuOpen(false)}
        >
          作品集
        </Link>
      </div>
    </header>
  )
}
