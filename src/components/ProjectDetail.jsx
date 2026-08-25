import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import worksData from '../data/works.js'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import ContactModal from './ContactModal.jsx'
import Icon from './Icon.jsx'
import Navbar from './Navbar.jsx'
import WorksGallery from './WorksGallery.jsx'
import { AiPairGallery, AiVerticalGallery } from './AiGroupGalleries.jsx'

const categoryMap = {
  'brand-visual': 'brand',
  ecommerce: 'ecommerce',
  'ai-creation': 'ai',
  marketing: 'beauty',
}

export default function ProjectDetail() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const [modalOpen, setModalOpen] = useState(false)
  const { slug } = useParams()
  const project = site.projects.find((p) => p.slug === slug) ?? site.projects[0]
  if (project.to) {
    return <Navigate to={project.to} replace />
  }
  const idx = site.projects.indexOf(project)
  const prev = site.projects[(idx - 1 + site.projects.length) % site.projects.length]
  const next = site.projects[(idx + 1) % site.projects.length]
  const cat = categoryMap[project.slug]
  const catImages = cat ? worksData.filter((w) => w.cat === cat) : []
  const catGroups = []
  {
    const map = new Map()
    catImages.forEach((w) => {
      const key = w.group || '其他'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(w)
    })
    map.forEach((images, group) => catGroups.push({ group, images }))
  }

  return (
    <div className="site detail" ref={rootRef}>
      <Navbar />
      <main className="detail__main">
        <div className="container">
          <Link
            className="detail__back"
            to={`/?focus=${project.slug}#projects`}
            data-reveal
          >
            <Icon name="arrow" size={16} />
            返回作品
          </Link>

          <div className="detail__cover" data-reveal>
            <img src={project.cover} alt={`${project.title}封面`} />
            <span className="detail__cover-index">{project.index}</span>
            <span className="detail__cover-en">{project.enTitle}</span>
          </div>

          <header className="detail__head" data-reveal>
            <h1 className="detail__title">{project.title}</h1>
            <p className="detail__desc">{project.description}</p>
            <div className="detail__tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <dl className="detail__meta" data-reveal>
            <div className="detail__meta-item">
              <dt>客户 / 项目</dt>
              <dd>{project.client}</dd>
            </div>
            <div className="detail__meta-item">
              <dt>年份</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="detail__meta-item">
              <dt>我的角色</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="detail__meta-item">
              <dt>工具</dt>
              <dd>{project.tools}</dd>
            </div>
          </dl>

          <section className="detail__section" data-reveal>
            <h2 className="detail__section-title">项目亮点</h2>
            <ul className="detail__highlights">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="detail__section" data-reveal>
            <h2 className="detail__section-title">更多作品截图</h2>
            {catImages.length ? (
              <div className="detail__groups">
                {catGroups.map((g) => (
                  <div className="detail__group" key={g.group}>
                    <h3 className="detail__group-title">
                      {g.group}
                      <span className="detail__group-count">{g.images.length} 件</span>
                    </h3>
                    {g.group === 'ai品牌IP设计' ? (
                      <AiVerticalGallery images={g.images} />
                    ) : g.group === 'ai白膜渲染' ? (
                      <AiPairGallery images={g.images} />
                    ) : (
                      <WorksGallery
                        images={g.images}
                        max={6}
                        variant={
                          g.group === '详情页' || g.group === '主图' ? 'detail' : 'masonry'
                        }
                        className="works__grid--detail"
                      />
                    )}
                    <div className="detail__group-more">
                      <Link className="text-link" to={`/portfolio#${encodeURIComponent(g.group)}`}>
                        查看全部 {g.images.length} 件作品
                        <Icon name="arrow" size={15} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="detail__placeholder">此处为占位区域，待补充真实案例截图。</p>
                <div className="detail__gallery">
                  <span />
                  <span />
                  <span />
                </div>
              </>
            )}
          </section>

          <div className="detail__cta" data-reveal>
            <p>对这个项目感兴趣？</p>
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              联系我
            </button>
          </div>

          <nav className="detail__nav" data-reveal>
            <Link className="detail__nav-link" to={`/work/${prev.slug}`}>
              <Icon name="arrow" size={16} />
              <span>
                <small>上一个</small>
                {prev.title}
              </span>
            </Link>
            <Link className="detail__nav-link detail__nav-link--next" to={`/work/${next.slug}`}>
              <span>
                <small>下一个</small>
                {next.title}
              </span>
              <Icon name="arrow" size={16} />
            </Link>
          </nav>
        </div>
      </main>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
