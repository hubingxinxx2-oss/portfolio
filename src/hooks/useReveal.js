import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power4.out'

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export default function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef?.current ?? document
    if (!root) return undefined

    // 减少动态偏好：不做任何入场动画
    if (reducedMotion()) {
      return undefined
    }

    const ctx = gsap.context(() => {
      try {
      // ---------- 特殊容器（内部元素统一编排，不做默认淡入） ----------
      const containers = [
        '.section-heading',
        '.works__head',
        '.gallery__head',
        '.detail__head',
        '.detail__cover',
        '.projects__grid',
        '.skills__grid',
        '.stats',
        '.timeline',
        '.tools__list',
        '.contact__title',
        '.contact__rows',
        '.works__module',
        '.gallery__group',
        '.works__masonry',
        '.profile',
      ]
      const isContainer = (el) => containers.some((sel) => el.matches(sel))
      const inContainer = (el) =>
        containers.some((sel) => el.closest(sel) && !el.matches(sel))

      // ---------- 默认淡入（普通元素） ----------
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        if (el.closest('.hero')) return
        if (isContainer(el)) return
        if (inContainer(el)) return
        gsap.fromTo(
          el,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.25,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // ---------- 模块大标题：英文先行大幅进场，中文标题遮罩揭开 ----------
      const headingBlock = (head) => {
        const en = head.querySelector('.section-heading__en')
        const title = head.querySelector(
          '.section-heading__title, .works__title, .gallery__title, .detail__title, h1, h2',
        )
        const tl = gsap.timeline({
          scrollTrigger: { trigger: head, start: 'top 86%', once: true },
          defaults: { ease: EASE },
        })
        if (en) {
          tl.fromTo(
            en,
            { y: 130, opacity: 0, skewY: 6 },
            { y: 0, opacity: 1, skewY: 0, duration: 1.25 },
            0,
          )
        }
        if (title) {
          tl.fromTo(
            title,
            { y: 78, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
            { y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.2 },
            0.12,
          )
        }
      }
      root.querySelectorAll('.section-heading, .works__head, .gallery__head').forEach(headingBlock)

      const detailHead = root.querySelector('.detail__head')
      if (detailHead) {
        headingBlock(detailHead)
        const desc = detailHead.querySelector('.detail__desc')
        const tags = detailHead.querySelector('.detail__tags')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: detailHead, start: 'top 86%', once: true },
          defaults: { ease: EASE },
        })
        if (desc) tl.fromTo(desc, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.45)
        if (tags) tl.fromTo(tags, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.6)
      }

      // ---------- 卡片 / 列表依次 Stagger ----------
      const stagger = (trigger, targets, { y = 90, scale = 0.97, stagger = 0.12, duration = 1.2, start = 'top 84%' } = {}) => {
        if (!targets.length) return
        gsap.fromTo(
          targets,
          { y, opacity: 0, scale },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration,
            ease: EASE,
            stagger,
            scrollTrigger: { trigger, start, once: true },
          },
        )
      }

      const grid = root.querySelector('.projects__grid')
      if (grid) stagger(grid, grid.querySelectorAll('.project'), { y: 100, scale: 0.96, stagger: 0.13, duration: 1.3 })

      const skills = root.querySelector('.skills__grid')
      if (skills) stagger(skills, skills.querySelectorAll('.skill'), { y: 80, stagger: 0.1 })

      const stats = root.querySelector('.stats')
      if (stats) stagger(stats, stats.querySelectorAll('.stat'), { y: 64, stagger: 0.1, duration: 1.0 })

      const timeline = root.querySelector('.timeline')
      if (timeline) stagger(timeline, timeline.querySelectorAll('.job'), { y: 72, stagger: 0.12 })

      const tools = root.querySelector('.tools__list')
      if (tools) stagger(tools, tools.querySelectorAll('.tool'), { y: 46, stagger: 0.05, duration: 0.9, start: 'top 90%' })

      const rows = root.querySelector('.contact__rows')
      if (rows) stagger(rows, rows.querySelectorAll('.contact__row'), { y: 56, stagger: 0.1, duration: 1.0 })

      // ---------- 作品模块：标题 + 图片瀑布流依次出现 ----------
      root.querySelectorAll('.works__module').forEach((mod) => {
        const head = mod.querySelector('.works__module-head')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: mod, start: 'top 86%', once: true },
          defaults: { ease: EASE },
        })
        if (head) tl.fromTo(head, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95 }, 0)
      })

      root.querySelectorAll('.works__masonry').forEach((m) => {
        const items = m.querySelectorAll('.works__item')
        if (!items.length) return
        gsap.fromTo(
          items,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.045,
            scrollTrigger: { trigger: m, start: 'top 88%', once: true },
          },
        )
      })

      // ---------- 画廊（站酷式连续预览） ----------
      root.querySelectorAll('.gallery__group').forEach((grp) => {
        const head = grp.querySelector('.gallery__group-head')
        const items = grp.querySelectorAll('.gallery__item')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: grp, start: 'top 88%', once: true },
          defaults: { ease: 'power3.out' },
        })
        if (head) tl.fromTo(head, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0)
        if (items.length) {
          tl.fromTo(items, { y: 64, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, stagger: 0.035 }, 0.1)
        }
      })

      // ---------- 图片 Reveal：遮罩 + 轻微缩放 ----------
      const cover = root.querySelector('.detail__cover')
      if (cover) {
        const img = cover.querySelector('img')
        gsap.fromTo(
          cover,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.35,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: cover, start: 'top 86%', once: true },
          },
        )
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.14 },
            {
              scale: 1,
              duration: 1.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: cover, start: 'top 86%', once: true },
            },
          )
        }
      }

      const profile = root.querySelector('.profile')
      if (profile) {
        gsap.fromTo(
          profile,
          { clipPath: 'inset(0 0 100% 0)', y: 46 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1.35,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: profile, start: 'top 86%', once: true },
          },
        )
      }

      // ---------- 轻微 Parallax（只针对少量元素，scrub 跟随滚动） ----------
      const hero = root.matches?.('.hero') ? root : root.querySelector('.hero')
      const heroMedia = root.querySelector('.hero__media')
      if (hero && heroMedia) {
        gsap.fromTo(
          heroMedia,
          { yPercent: 0 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      root.querySelectorAll('.project__waves').forEach((waves) => {
        gsap.fromTo(
          waves,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: waves,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })

      const contactGlow = root.querySelector('.contact__glow')
      if (contactGlow) {
        gsap.fromTo(
          contactGlow,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: contactGlow,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }
      } catch (err) {
        // 动画初始化失败时 fail-open：清掉半途设置的隐藏样式，避免黑屏/内容隐形
        root
          .querySelectorAll(
            '[data-reveal], .works__item, .project, .skill, .stat, .job, .tool, .contact__row, .gallery__item, .detail__cover, .profile',
          )
          .forEach((el) => {
            el.style.opacity = ''
            el.style.transform = ''
            el.style.clipPath = ''
            el.style.filter = ''
          })
        console.warn('[useReveal] 动画初始化失败，已回退为直接显示', err)
      }
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}
