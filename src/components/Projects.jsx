import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import BorderGlow from './BorderGlow.jsx'
import GradientWaves from './GradientWaves.jsx'

const waveThemes = {
  'brand-visual': {
    horizonColor: '#3d0710',
    waveColor: '#ff2733',
    crestColor: '#ffc9cd',
    glowColor: '0 100 60',
    colors: ['#ff7a80', '#f22f38', '#ffb1b6'],
  },
  ecommerce: {
    horizonColor: '#3a1403',
    waveColor: '#ff8a1f',
    crestColor: '#ffe3b3',
    glowColor: '28 100 56',
    colors: ['#ffb36b', '#ff8a1f', '#ffd9a3'],
  },
  'ai-creation': {
    horizonColor: '#180a33',
    waveColor: '#a35bff',
    crestColor: '#e3ccff',
    glowColor: '268 100 68',
    colors: ['#c39bff', '#a35bff', '#e3ccff'],
  },
  marketing: {
    horizonColor: '#04172e',
    waveColor: '#2f8bff',
    crestColor: '#c4e0ff',
    glowColor: '212 100 60',
    colors: ['#7db6ff', '#2f8bff', '#c4e0ff'],
  },
  'ui-portfolio': {
    horizonColor: '#062a24',
    waveColor: '#14c9a1',
    crestColor: '#c9f7e8',
    glowColor: '166 82 44',
    colors: ['#5fe3c6', '#14c9a1', '#c9f7e8'],
  },
  'print-portfolio': {
    horizonColor: '#2e0a2a',
    waveColor: '#ff3fb0',
    crestColor: '#ffd1ec',
    glowColor: '324 100 62',
    colors: ['#ff8ad0', '#ff3fb0', '#ffd1ec'],
  },
}

function ProjectCard({ project, variant = '', focus = false }) {
  const theme = waveThemes[project.slug] ?? waveThemes['brand-visual']
  return (
    <article
      className={`project ${variant ? `project--${variant}` : ''} ${focus ? 'project--focus' : ''}`}
      data-reveal
      data-slug={project.slug}
    >
      <BorderGlow
        backgroundColor="#101014"
        borderRadius={32}
        glowRadius={40}
        edgeSensitivity={32}
        coneSpread={22}
        glowIntensity={1.15}
        fillOpacity={0.45}
        glowColor={theme.glowColor}
        colors={theme.colors}
      >
        <Link
          className="project__cover"
          to={project.to ?? `/work/${project.slug}`}
          aria-label={`查看${project.title}`}
        >
          <GradientWaves
            horizonColor={theme.horizonColor}
            waveColor={theme.waveColor}
            crestColor={theme.crestColor}
            speed={0.5}
            amplitude={2.6}
            waveScale={0.78}
            waveRatio={0.95}
            swell={42}
            turbulence={24}
            tilt={1.12}
            zoom={1.0}
            height={5.8}
            fogDepth={26}
            detail="low"
            brightness={1.25}
            grain
            grainIntensity={0.05}
            mouseInteraction
            parallaxStrength={0.35}
            className="project__waves"
          />
          <span className="project__shade" />
          <span className="project__index">{project.index}</span>
          <div className="project__overlay">
            <h3 className="project__title">{project.title}</h3>
            <span className="project__en">{project.enTitle}</span>
            <p className="project__desc">{project.description}</p>
            <div className="project__foot">
              <div className="project__tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project__link">
                查看案例
                <Icon name="arrow" size={15} />
              </span>
            </div>
          </div>
        </Link>
      </BorderGlow>
    </article>
  )
}

export default function Projects() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const location = useLocation()
  const navigate = useNavigate()
  const [focusSlug, setFocusSlug] = useState(null)

  useEffect(() => {
    const focus = new URLSearchParams(location.search).get('focus')
    if (!focus) {
      setFocusSlug(null)
      return undefined
    }
    setFocusSlug(focus)
    const t1 = setTimeout(() => {
      const el = document.querySelector(`[data-slug="${focus}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
    const t2 = setTimeout(() => {
      setFocusSlug(null)
      navigate(location.pathname + location.hash, { replace: true })
    }, 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [location.search, location.pathname, location.hash, navigate])

  return (
    <section className="section projects" id="projects" ref={rootRef}>
      <div className="container">
        <SectionHeading index="02" title="精选项目" en="SELECTED PROJECTS" />

        <div className="projects__grid">
          {site.projects.map((project) => (
            <ProjectCard
              key={project.index}
              project={project}
              focus={focusSlug === project.slug}
            />
          ))}
        </div>

        <div className="projects__more" data-reveal>
          <Link className="text-link" to="/portfolio">
            查看完整作品集
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
