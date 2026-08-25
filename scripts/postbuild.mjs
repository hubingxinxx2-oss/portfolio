import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const indexFile = resolve(dist, 'index.html')
const notFoundFile = resolve(dist, '404.html')

if (!existsSync(indexFile)) {
  console.error('[postbuild] dist/index.html 不存在，请先执行 build')
  process.exit(1)
}

copyFileSync(indexFile, notFoundFile)
console.log('[postbuild] 已生成 404.html（GitHub Pages SPA 兜底）')
