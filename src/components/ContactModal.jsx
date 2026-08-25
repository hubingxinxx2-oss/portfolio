import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../data/site.js'
import Icon from './Icon.jsx'

export default function ContactModal({ open, onClose }) {
  const [copied, setCopied] = useState('')

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

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="联系方式"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <h3 className="modal__title">联系我</h3>
        <p className="modal__subtitle">扫码添加微信，或直接发送邮件</p>
        <img
          className="modal__qr"
          src="/assets/wechat-qr.png"
          alt="个人微信二维码"
          width="400"
          height="400"
        />
        <div className="modal__rows">
          <button className="modal__row" type="button" onClick={() => copy('wechat')}>
            <span className="modal__row-label">微信号</span>
            <strong className="modal__row-value">{site.wechat}</strong>
            <span className="modal__row-copy">{copied === 'wechat' ? '已复制' : '复制'}</span>
          </button>
          <button className="modal__row" type="button" onClick={() => copy('email')}>
            <span className="modal__row-label">邮箱</span>
            <strong className="modal__row-value">{site.email}</strong>
            <span className="modal__row-copy">{copied === 'email' ? '已复制' : '复制'}</span>
          </button>
        </div>
        <a className="modal__mailto" href={`mailto:${site.email}`}>
          直接发送邮件
          <Icon name="arrow" size={15} />
        </a>
      </div>
    </div>,
    document.body,
  )
}
