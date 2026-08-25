import { useRef, useState } from 'react'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import ContactModal from './ContactModal.jsx'

export default function Contact() {
  const rootRef = useRef(null)
  useReveal(rootRef)
  const [copied, setCopied] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const copy = async (key) => {
    const value = key === 'email' ? site.email : site.wechat
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(''), 1600)
    } catch {
      setCopied(key)
      setTimeout(() => setCopied(''), 1600)
    }
  }

  return (
    <section className="contact" id="contact" ref={rootRef}>
      <div className="contact__bg-grid" aria-hidden="true" />
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        <p className="contact__eyebrow" data-reveal>
          {site.contact.headingEn}
        </p>
        <h2 className="contact__title" data-reveal>
          {site.contact.heading}
          <br />
          <span className="text-gradient">{site.contact.headingHighlight}</span>
        </h2>
        <p className="contact__subtitle" data-reveal>
          {site.contact.subtitle}
        </p>

        <div className="contact__actions" data-reveal>
          <button className="btn btn--primary btn--lg" type="button" onClick={() => setModalOpen(true)}>
            {site.contact.cta}
          </button>
        </div>

        <div className="contact__rows" data-reveal>
          <button
            className="contact__row"
            type="button"
            onClick={() => copy('email')}
            title="点击复制邮箱"
          >
            <span className="contact__row-label">
              <Icon name="mail" size={15} />
              <span>邮箱</span>
            </span>
            <span className="contact__row-value">{site.email}</span>
            <span className="contact__row-copy">
              {copied === 'email' ? '已复制' : <Icon name="copy" size={15} />}
            </span>
          </button>
          <button
            className="contact__row"
            type="button"
            onClick={() => copy('wechat')}
            title="点击复制微信号"
          >
            <span className="contact__row-label">
              <Icon name="chat" size={15} />
              <span>微信</span>
            </span>
            <span className="contact__row-value">{site.wechat}</span>
            <span className="contact__row-copy">
              {copied === 'wechat' ? '已复制' : <Icon name="copy" size={15} />}
            </span>
          </button>
        </div>

        <footer className="contact__footer" data-reveal>
          <span>© 2026 {site.name} · {site.role} · {site.location}</span>
          <a className="contact__back" href="#home">返回顶部</a>
        </footer>
        <p className="contact__disclaimer" data-reveal>
          本站内容仅用于设计交流与学习展示，所有素材版权归原作者所有，请勿用于商业用途。
        </p>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
