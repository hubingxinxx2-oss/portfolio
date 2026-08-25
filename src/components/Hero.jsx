import { useEffect, useRef } from 'react'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import Prism from './Prism.jsx'
import WarpText from './WarpText.jsx'

export default function Hero() {
  const heroRef = useRef(null)
  useReveal(heroRef)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      const p = Math.min(window.scrollY / 480, 1)
      el.style.setProperty('--hero-progress', p)
      document.documentElement.style.setProperty('--page-scroll', p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__media">
        <div className="hero__prism" aria-hidden="true">
          <Prism
            animationType="3drotate"
            timeScale={0.32}
            scale={2.5}
            glow={1.1}
            noise={0.3}
            colorFrequency={1.05}
            bloom={1}
            hueShift={0}
            suspendWhenOffscreen
          />
        </div>
        <div className="hero__overlay" />
        <div className="hero__glow hero__glow--1" aria-hidden="true" />
        <div className="hero__glow hero__glow--2" aria-hidden="true" />
        <div className="hero__glow hero__glow--3" aria-hidden="true" />
      </div>
      <span className="hero__ring hero__ring--1" aria-hidden="true" />
      <span className="hero__ring hero__ring--2" aria-hidden="true" />
      <span className="hero__spark hero__spark--1" aria-hidden="true">✦</span>
      <span className="hero__spark hero__spark--2" aria-hidden="true">✦</span>

      <div className="hero__content container">
        <span className="hero__badge" data-reveal>
          <span className="hero__badge-dot" />
          {site.hero.badge}
        </span>
        <p className="hero__eyebrow" data-reveal>
          {site.hero.eyebrow}
        </p>

        <div className="hero__title" data-reveal>
          <WarpText
            text={site.hero.titleTop}
            color="#ff5561"
            fontFamily="Anton, 'Inter', 'PingFang SC', sans-serif"
            warpStrength={0.055}
            warpScale={1.6}
            speed={0.5}
            pointerInfluence={0.4}
            pointerStrength={0.42}
            refraction={0.02}
            ripple
            fontSize="clamp(72px, 10.5vw, 184px)"
            fontWeight={400}
            letterSpacing="0.01em"
            style={{ height: 'clamp(180px, 26vw, 370px)' }}
          />
        </div>

        <p className="hero__subtitle" data-reveal>
          {site.hero.subtitle}
        </p>

        <div className="hero__meta" data-reveal>
          <span>{site.location}</span>
          <i aria-hidden="true" />
          <span>{site.experienceYears} 年设计经验</span>
        </div>

        <div className="hero__actions" data-reveal>
          <a className="btn btn--vivid" href="#projects">
            查看作品
          </a>
          <a className="btn btn--secondary" href="#contact">
            联系我
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="向下滚动">
        <span className="hero__scroll-text">向下滚动</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  )
}
