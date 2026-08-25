import { useEffect, useState } from 'react'
import WorksLightbox from './WorksLightbox.jsx'

function useColumnCount(detail) {
  const [cols, setCols] = useState(detail ? 2 : 4)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (detail) {
        setCols(w >= 820 ? 2 : 1)
      } else {
        setCols(w >= 1500 ? 4 : w >= 1100 ? 3 : w >= 700 ? 2 : 1)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [detail])
  return cols
}

function splitColumns(items, count) {
  const buckets = Array.from({ length: count }, () => ({ items: [], weight: 0 }))
  items.forEach((entry) => {
    const img = entry.img
    const weight = (img.h || 1) / (img.w || 1)
    let idx = 0
    for (let i = 1; i < count; i += 1) {
      if (buckets[i].weight < buckets[idx].weight) idx = i
    }
    buckets[idx].items.push(entry)
    buckets[idx].weight += weight
  })
  return buckets.map((b) => b.items)
}

export default function WorksGallery({ images = [], max = 0, className = '', variant = 'masonry' }) {
  const shown = max > 0 ? images.slice(0, max) : images
  const detail = variant === 'detail'
  const cols = useColumnCount(detail)
  const columns = splitColumns(
    shown.map((img, i) => ({ img, i })),
    cols,
  )
  const [index, setIndex] = useState(null)
  const [failed, setFailed] = useState(() => new Set())

  const markFailed = (src) => setFailed((prev) => new Set(prev).add(src))
  const open = (i) => setIndex(i)
  const close = () => setIndex(null)

  if (!shown.length) return null

  return (
    <div className={`works__masonry ${detail ? 'works__masonry--detail' : ''} ${className}`.trim()}>
      {columns.map((col, c) => (
        <div className="works__masonry-col" key={c}>
          {col.map(({ img, i }) =>
            failed.has(img.src) ? (
              <div className="works__item works__item--failed" key={img.src}>
                <span>图片加载失败</span>
              </div>
            ) : (
              <button
                className={`works__item ${detail ? 'works__item--long' : ''}`}
                key={img.src}
                type="button"
                onClick={() => open(i)}
              >
                <img
                  src={img.thumb || img.src}
                  alt={img.label}
                  width={img.tw || img.w}
                  height={img.th || img.h}
                  loading="lazy"
                  decoding="async"
                  onError={() => markFailed(img.src)}
                />
                <span className="works__item-label">{img.label}</span>
                {detail && <span className="works__item-hint">长图 · 点击查看完整</span>}
              </button>
            ),
          )}
        </div>
      ))}

      <WorksLightbox
        items={shown}
        index={index}
        onClose={close}
        onNavigate={setIndex}
      />
    </div>
  )
}
