import { useState } from 'react'
import WorksLightbox from './WorksLightbox.jsx'

// ai品牌IP设计：按文件名 1-7 竖版预览
export function AiVerticalGallery({ images }) {
  const [index, setIndex] = useState(null)
  const sorted = [...images].sort((a, b) => {
    const na = parseInt((a.src.match(/ip-(\d+)/) || [])[1] || '0', 10)
    const nb = parseInt((b.src.match(/ip-(\d+)/) || [])[1] || '0', 10)
    return na - nb
  })

  return (
    <div className="ai-stack">
      {sorted.map((img, i) => (
        <figure className="ai-stack__item" key={img.src}>
          <button
            className="ai-stack__preview"
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`查看${img.label}`}
          >
            <img
              src={img.thumb || img.src}
              alt={img.label}
              width={img.tw}
              height={img.th}
              loading="lazy"
              decoding="async"
            />
          </button>
          <figcaption className="ai-stack__head">
            <span className="ai-stack__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="ai-stack__label">{img.label}</span>
          </figcaption>
        </figure>
      ))}
      <WorksLightbox items={sorted} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </div>
  )
}

// ai白膜渲染：渲染前 / 渲染后 成对关联
export function AiPairGallery({ images }) {
  const [index, setIndex] = useState(null)
  const map = new Map()
  images.forEach((img) => {
    const m = (img.label || '').match(/(渲染前|渲染后)(\d+)/)
    if (!m) return
    const num = parseInt(m[2], 10)
    if (!map.has(num)) map.set(num, { before: null, after: null })
    const pair = map.get(num)
    if (m[1] === '渲染前') pair.before = img
    else pair.after = img
  })

  const pairs = []
  const ordered = []
  ;[...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .forEach(([num, pair]) => {
      pairs.push({ num, ...pair })
      if (pair.before) ordered.push(pair.before)
      if (pair.after) ordered.push(pair.after)
    })

  return (
    <div className="ai-pairs">
      {pairs.map((p) => (
        <div className="ai-pair" key={p.num}>
          <header className="ai-pair__head">
            <span className="ai-pair__num">{String(p.num).padStart(2, '0')}</span>
            <span className="ai-pair__title">渲染前 / 渲染后 对比</span>
          </header>
          <div className="ai-pair__grid">
            {['before', 'after'].map((phase) => {
              const entry = p[phase]
              const idx = entry ? ordered.indexOf(entry) : -1
              return (
                <button
                  className="ai-pair__cell"
                  type="button"
                  key={phase}
                  disabled={!entry}
                  onClick={() => idx >= 0 && setIndex(idx)}
                  aria-label={entry ? `查看${entry.label}` : ''}
                >
                  {entry ? (
                    <>
                      <img
                        src={entry.thumb || entry.src}
                        alt={entry.label}
                        width={entry.tw}
                        height={entry.th}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="ai-pair__tag">{phase === 'before' ? '渲染前' : '渲染后'}</span>
                    </>
                  ) : (
                    <span className="ai-pair__empty">缺失</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      <WorksLightbox items={ordered} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </div>
  )
}
