import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function WorksLightbox({ items, index, onClose, onNavigate }) {
  const [lightboxLoaded, setLightboxLoaded] = useState(false)
  const [lightboxFailed, setLightboxFailed] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const loadedRef = useRef(0)
  const scrollRef = useRef(null)
  const pointerDownRef = useRef(null)

  const current = items[index]
  const isSegmented = !!(current && current.segs && current.segs.length > 1)

  useEffect(() => {
    setLightboxLoaded(false)
    setLightboxFailed(false)
    setOverflowing(false)
    loadedRef.current = 0
  }, [index])

  useEffect(() => {
    if (index === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, items.length, onClose, onNavigate])

  useEffect(() => {
    if (!lightboxLoaded) return undefined
    const el = scrollRef.current
    if (el) setOverflowing(el.scrollHeight > el.clientHeight + 4)
    return undefined
  }, [lightboxLoaded, index])

  // 预加载相邻作品的完整图，翻页时无需等待
  useEffect(() => {
    if (index === null) return undefined
    const preload = (i) => {
      const item = items[(i + items.length) % items.length]
      if (!item) return
      const srcs = item.segs && item.segs.length > 1 ? item.segs : [item.src]
      srcs.slice(0, 2).forEach((s) => {
        const img = new Image()
        img.src = s
      })
    }
    preload(index + 1)
    preload(index - 1)
    return undefined
  }, [index, items])

  if (index === null || !current) return null

  const handleBackdropClick = (e) => {
    // 触屏上滑动后松手不应误触发关闭
    if (pointerDownRef.current) {
      const dx = e.clientX - pointerDownRef.current.x
      const dy = e.clientY - pointerDownRef.current.y
      if (Math.hypot(dx, dy) > 12) return
    }
    onClose()
  }

  return createPortal(
    <div
      className="works-lightbox"
      onClick={handleBackdropClick}
      onPointerDown={(e) => {
        pointerDownRef.current = { x: e.clientX, y: e.clientY }
      }}
      role="presentation"
    >
      <div className="works-lightbox__frame" onClick={(e) => e.stopPropagation()}>
        <button className="works-lightbox__close" type="button" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <div
          className="works-lightbox__scroll"
          ref={scrollRef}
          onScroll={(e) => {
            if (e.currentTarget.scrollTop > 8) setOverflowing(false)
          }}
        >
          {!lightboxLoaded && <div className="works-lightbox__loading">加载中…</div>}
          {lightboxLoaded && lightboxFailed && (
            <div className="works-lightbox__loading">图片加载失败，请重试</div>
          )}
          <div className={`works-lightbox__canvas ${isSegmented ? 'works-lightbox__canvas--seamless' : ''}`}>
            {(isSegmented ? current.segs : [current.src]).map((s) => (
              <img
                className="works-lightbox__img"
                key={s}
                src={s}
                alt={current.label}
                decoding="async"
                onLoad={() => {
                  loadedRef.current += 1
                  const segs = isSegmented ? current.segs.length : 1
                  if (loadedRef.current >= segs) setLightboxLoaded(true)
                }}
                onError={() => {
                  setLightboxLoaded(true)
                  setLightboxFailed(true)
                }}
              />
            ))}
          </div>
        </div>
        {overflowing && (
          <div className="works-lightbox__hint" aria-hidden="true">
            ↓ 滚动查看完整图片
          </div>
        )}
        <div className="works-lightbox__meta">
          <span>{current.label}</span>
          <span>
            {index + 1} / {items.length}
          </span>
        </div>
        {items.length > 1 && (
          <>
            <button
              className="works-lightbox__nav works-lightbox__nav--prev"
              type="button"
              onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              aria-label="上一张"
            >
              ‹
            </button>
            <button
              className="works-lightbox__nav works-lightbox__nav--next"
              type="button"
              onClick={() => onNavigate((index + 1) % items.length)}
              aria-label="下一张"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
