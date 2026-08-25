import worksData from './works.json'

// GitHub Pages 子路径部署：给 public 资源路径统一加 BASE_URL 前缀
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBase = (url) => (url && url.startsWith('/') ? base + url : url)

const works = worksData.map((w) => ({
  ...w,
  thumb: withBase(w.thumb),
  src: withBase(w.src),
  segs: Array.isArray(w.segs) ? w.segs.map(withBase) : w.segs,
}))

export default works
