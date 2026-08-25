import { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import worksData from '../data/works.js'
import Navbar from './Navbar.jsx'
import useReveal from '../hooks/useReveal.js'
import WorksGallery from './WorksGallery.jsx'
import { AiPairGallery, AiVerticalGallery } from './AiGroupGalleries.jsx'

export default function PortfolioPage() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const location = useLocation()
  const modules = useMemo(() => {
    const map = new Map()
    worksData
      .filter((w) => w.group !== '主图' && w.group !== 'UI 作品集' && w.group !== '平面作品集')
      .forEach((w) => {
        if (!map.has(w.group)) map.set(w.group, [])
        map.get(w.group).push(w)
      })
    const order = (t) =>
      t === 'UI 作品集'
        ? 0
        : t === '平面作品集'
          ? 1
          : t === '详情页'
            ? 2
            : t === '主图'
              ? 3
              : 4
    return [...map.entries()]
      .map(([title, images]) => ({ title, images }))
      .sort((a, b) => order(a.title) - order(b.title))
  }, [])

  useEffect(() => {
    const hash = decodeURIComponent(location.hash.slice(1))
    if (!hash) return undefined
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 450)
    return () => clearTimeout(t)
  }, [location.hash])

  return (
    <div className="site works" ref={rootRef}>
      <Navbar />
      <main className="works__main container">
        <header className="works__head" data-reveal>
          <span className="section-heading__en">PORTFOLIO</span>
          <h1 className="works__title">作品集</h1>
          <p className="works__subtitle">
            按产品与类型分类展示，点击可查看大图
          </p>
          <Link className="works__gallery-link" to="/gallery">
            UI 作品集 · 平面作品集完整预览
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        {modules.map((mod, i) => (
          <section className="works__module" key={mod.title} id={mod.title} data-reveal>
            <header className="works__module-head">
              <span className="works__module-index">0{i + 1}</span>
              <h2 className="works__module-title">{mod.title}</h2>
              <span className="works__module-count">{mod.images.length} 件</span>
            </header>
            {mod.title === 'ai品牌IP设计' ? (
              <AiVerticalGallery images={mod.images} />
            ) : mod.title === 'ai白膜渲染' ? (
              <AiPairGallery images={mod.images} />
            ) : (
              <WorksGallery
                images={mod.images}
                variant={mod.title === '详情页' || mod.title === '主图' ? 'detail' : 'masonry'}
              />
            )}
          </section>
        ))}
      </main>
    </div>
  )
}
