import { useRef, useState } from 'react'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import ContactModal from './ContactModal.jsx'
import Icon from './Icon.jsx'
import ProfileCard from './ProfileCard.jsx'
import SectionHeading from './SectionHeading.jsx'

function ContactChip({ icon, label, value, onClick }) {
  return (
    <button className="chip" type="button" onClick={onClick} title="点击复制">
      <Icon name={icon} size={15} />
      <span className="chip__label">{label}</span>
      <span className="chip__value">{value}</span>
      <Icon name="copy" size={13} className="chip__copy" />
    </button>
  )
}

export default function About() {
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
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(key)
      setTimeout(() => setCopied(''), 1600)
    }
  }

  return (
    <section className="section about" id="about" ref={rootRef}>
      <div className="container">
        <SectionHeading index="01" title={site.about.heading} en={site.about.headingEn} />

        <div className="about__grid">
          <aside className="profile" data-reveal>
            <ProfileCard
              avatarUrl="/assets/avatar.jpg"
              miniAvatarUrl="/assets/avatar.jpg"
              name={site.name}
              title={`${site.role} · ${site.roleTags[0]}`}
              handle={site.wechat}
              status="开放合作中"
              contactText="联系我"
              onContactClick={() => setModalOpen(true)}
              behindGlowEnabled
              behindGlowColor="rgba(242, 47, 56, 0.5)"
              behindGlowSize="45%"
              innerGradient="linear-gradient(145deg, rgba(122, 22, 32, 0.88) 0%, rgba(16, 6, 10, 0.82) 100%)"
              iconUrl="/assets/card-pattern.svg"
              className="profile-card"
            />
            <div className="profile__info">
              <p className="profile__location">
                {site.location} · 可到岗
              </p>
              <div className="profile__contact">
                <ContactChip
                  icon="mail"
                  label="邮箱"
                  value={copied === 'email' ? '已复制' : site.email}
                  onClick={() => copy('email')}
                />
                <ContactChip
                  icon="chat"
                  label="微信"
                  value={copied === 'wechat' ? '已复制' : site.wechat}
                  onClick={() => copy('wechat')}
                />
              </div>
            </div>
            <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </aside>

          <div className="about__body">
            <div className="about__intro" data-reveal>
              {site.about.paragraphs.map((p, i) => (
                <p className={i === 0 ? 'about__lead' : ''} key={p.slice(0, 12)}>
                  {p}
                </p>
              ))}
              <p className="about__philosophy">Less is More.</p>
            </div>

            <div className="stats" data-reveal>
              {site.about.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat__value">
                    {s.value}
                    <span className="stat__unit">{s.unit}</span>
                  </span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="timeline" data-reveal>
              <div className="timeline__head">
                <span className="timeline__label">工作经历</span>
                <span className="timeline__en">WORK EXPERIENCE</span>
              </div>
              {site.experience.map((job) => (
                <article className="job" key={job.company}>
                  <header className="job__head">
                    <div>
                      <h4 className="job__company">{job.company}</h4>
                      <span className="job__role">{job.role}</span>
                    </div>
                    <time className="job__period">{job.period}</time>
                  </header>
                  <p className="job__summary">{job.summary}</p>
                  <ul className="job__points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="job" key="education">
                <header className="job__head">
                  <div>
                    <h4 className="job__company">{site.education.school}</h4>
                    <span className="job__role">{site.education.degree}</span>
                  </div>
                  <time className="job__period">教育经历</time>
                </header>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
