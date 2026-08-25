import { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import worksData from '../data/works.json'
import Navbar from './Navbar.jsx'
import useReveal from '../hooks/useReveal.js'

const groups = ['UI 作品集', '平面作品集']

function WorkImages({ img }) {
  if (img.segs && img.segs.length > 1) {
    return (
      <div className="gallery__images">
        {img.segs.map((s) => (
          <img key={s} src={s} alt={img.label} loading="lazy" decoding="async" />
        ))}
      </div>
    )
  }
  return (
    <div className="gallery__images">
      <img src={img.src} alt={img.label} loading="lazy" decoding="async" />
    </div>
  )
}

export default function GalleryPage() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const { group } = useParams()
  const activeGroups =
    group === 'ui' ? ['UI 作品集'] : group === 'print' ? ['平面作品集'] : groups
  const title =
    activeGroups.length === 1 ? `${activeGroups[0]} · 完整预览` : 'UI 作品集 · 平面作品集'
  const sections = useMemo(
    () =>
      activeGroups.map((g) => ({
        group: g,
        images: worksData.filter((w) => w.group === g),
      })),
    [group],
  )

  return (
    <div className="site gallery" ref={rootRef}>
      <Navbar />
      <main className="gallery__main container">
        <header className="gallery__head" data-reveal>
          <span className="section-heading__en">FULL PREVIEW</span>
          <h1 className="gallery__title">{title}</h1>
          <p className="gallery__subtitle">
            按原始顺序上下连续预览，共 {sections.reduce((n, s) => n + s.images.length, 0)} 件作品
          </p>
          <a className="gallery__back" href="/portfolio">
            ← 返回作品集
          </a>
        </header>

        {sections.map((section) => (
          <section className="gallery__group" key={section.group} data-reveal>
            <header className="gallery__group-head">
              <h2 className="gallery__group-title">{section.group}</h2>
              <span className="gallery__group-count">{section.images.length} 件</span>
            </header>
            <div className="gallery__stack">
              {section.images.map((img, i) => (
                <figure className="gallery__item" key={img.src}>
                  <div className="gallery__item-media">
                    <WorkImages img={img} />
                    <figcaption className="gallery__item-head">
                      <span className="gallery__item-num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="gallery__item-label">{img.label}</span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
