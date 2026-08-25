// Cloudflare Pages SPA 兜底：先尝试静态资源，未命中则回退到 index.html
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    // 静态资源直接命中则正常返回
    const asset = await env.ASSETS.fetch(request)
    if (asset.ok) return asset
    // 带扩展名的资源请求失败时原样返回，避免 HTML 冒充资源（MIME 错乱）
    if (/\.[a-zA-Z0-9]{2,5}$/.test(url.pathname)) return asset
    // 无扩展名的页面路由 → SPA 回退
    return env.ASSETS.fetch(new Request(new URL('/', url), request))
  },
}
