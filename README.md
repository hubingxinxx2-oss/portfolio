# 胡炳鑫 — 个人作品集网站

基于 React + Vite 构建的个人作品集，参考苹果官网的视觉风格：深黑背景、大字号排版、毛玻璃导航与圆角大卡片。PC 端优先，版心约 1700px。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:5173 预览；`npm run build` 生成生产构建。

## 部署

### Cloudflare Pages（国内主力，永久链接）

正式站点：https://huxin-portfolio.pages.dev/

```bash
npm run build        # 根路径 base，产物含 404.html（SPA 兜底）
npx wrangler pages deploy dist --project-name huxin-portfolio --branch main
```

需要先 `wrangler login` 或设置 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`。

### GitHub Pages（海外备用）

备用站点：https://hubingxinxx2-oss.github.io/portfolio/

```bash
npm run build:gh     # 产物带 /portfolio/ 子路径 base，并自动生成 404.html（SPA 兜底）
git subtree push --prefix dist origin gh-pages   # 把 dist 推送到 gh-pages 分支
```

仓库 `main` 分支保存源码，`gh-pages` 分支保存构建产物。资源路径已在源码中统一通过
`import.meta.env.BASE_URL` 加前缀，两个平台的 base 差异由 `build` / `build:gh` 两个脚本区分。

## 目录结构

```
src/
  data/site.js        # 站点内容（个人信息、项目、技能、联系方式）— 主要改这里
  data/works.js       # works.json 的路径包装层（自动加 BASE_URL 前缀）
  components/         # 五大模块组件
  index.css           # 全局样式与设计变量
scripts/postbuild.mjs # 构建后复制 index.html → 404.html
public/
  assets/             # 背景动效、占位封面、头像
```

## 待替换内容

- 头像：`public/assets/avatar.svg` 为占位头像，可换成真实照片
- 作品：`public/assets/works/` 已嵌入 323 件真实作品（UI / 品牌视觉 / 美妆电商 / 平面设计），分类清单在 `src/data/works.json`
- Hero 背景：首屏使用 WebGL Prism 动态棱镜（`src/components/Prism.jsx`），参数在 `Hero.jsx` 中调整

## 作品集页面

导航栏“作品集”进入 `/portfolio`：UI 作品集与平面作品集单独成模块，其余作品按“产品 × 类型”（品宣海报 / 详情页 / 主图 / 轮播图 / 活动海报 / 直播物料等）细分模块，预览图为花瓣网式自适应瀑布流，点击可查看大图；每个作品详情页下方也会展示对应分类的作品截图。
