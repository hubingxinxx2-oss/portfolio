# 胡炳鑫 — 个人作品集网站

基于 React + Vite 构建的个人作品集，参考苹果官网的视觉风格：深黑背景、大字号排版、毛玻璃导航与圆角大卡片。PC 端优先，版心约 1700px。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:5173 预览；`npm run build` 生成生产构建。

## 目录结构

```
src/
  data/site.js        # 站点内容（个人信息、项目、技能、联系方式）— 主要改这里
  components/         # 五大模块组件
  index.css           # 全局样式与设计变量
public/
  assets/             # 背景动效、占位封面、头像
```

## 待替换内容

- 头像：`public/assets/avatar.svg` 为占位头像，可换成真实照片
- 作品：`public/assets/works/` 已嵌入 323 件真实作品（UI / 品牌视觉 / 美妆电商 / 平面设计），分类清单在 `src/data/works.json`
- Hero 背景：首屏使用 WebGL Prism 动态棱镜（`src/components/Prism.jsx`），参数在 `Hero.jsx` 中调整

## 作品集页面

导航栏“作品集”进入 `/portfolio`：UI 作品集与平面作品集单独成模块，其余作品按“产品 × 类型”（品宣海报 / 详情页 / 主图 / 轮播图 / 活动海报 / 直播物料等）细分模块，预览图为花瓣网式自适应瀑布流，点击可查看大图；每个作品详情页下方也会展示对应分类的作品截图。
