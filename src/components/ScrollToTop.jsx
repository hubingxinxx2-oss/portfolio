import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const prevKey = useRef(pathname + hash)

  // 离开页面时记录滚动位置，返回（POP）时恢复
  useEffect(() => {
    const key = pathname + hash
    if (prevKey.current !== key) {
      sessionStorage.setItem(`scroll:${prevKey.current}`, String(window.scrollY || 0))
      prevKey.current = key
    }
  }, [pathname, hash])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
      return undefined
    }
    if (navigationType === 'POP') {
      const saved = sessionStorage.getItem(`scroll:${pathname}`)
      if (saved != null) {
        requestAnimationFrame(() => window.scrollTo(0, Number(saved)))
        return undefined
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    return undefined
  }, [pathname, hash, navigationType])

  return null
}
