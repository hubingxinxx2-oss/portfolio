import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import PortfolioPage from './components/PortfolioPage.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// three.js 只在首页光束背景用到，动态加载避免其他页面下载/解析 265KB gz
const Beams = lazy(() => import('./components/Beams.jsx'))

// GitHub Pages 子路径部署：构建时 base=/portfolio/，路由 basename 跟随 BASE_URL
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

function Home() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  )
}

// 背景光束只在首页渲染，且延迟到首帧之后，避免与首屏 WebGL 抢占 GPU
function BeamsLayer() {
  const { pathname } = useLocation()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let cancelled = false
    const show = () => {
      if (!cancelled) setReady(true)
    }
    const id =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(show, { timeout: 1200 })
        : setTimeout(show, 400)
    return () => {
      cancelled = true
      if ('requestIdleCallback' in window) window.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])
  if (pathname !== '/' || !ready) return null
  return (
    <div className="page-beams" aria-hidden="true">
      <Suspense fallback={null}>
        <Beams
          beamWidth={3.9}
          beamHeight={25}
          beamNumber={5}
          lightColor="#ff5a63"
          speed={3}
          noiseIntensity={0.35}
          scale={0.08}
          rotation={28}
        />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
      <BrowserRouter basename={basename}>
      <ScrollToTop />
      <BeamsLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:group" element={<GalleryPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
