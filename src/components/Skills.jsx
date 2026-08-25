import { useRef } from 'react'
import { site } from '../data/site.js'
import useReveal from '../hooks/useReveal.js'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { tools } from './ToolIcons.jsx'

export default function Skills() {
  const rootRef = useRef(null)
  useReveal(rootRef)

  return (
    <section className="section skills" id="skills" ref={rootRef}>
      <div className="container">
        <SectionHeading index="03" title="个人优势" en="WHAT I DO BEST" />

        <div className="skills__grid">
          {site.strengths.map((skill, i) => (
            <article className="skill" key={skill.title} data-reveal>
              <div className="skill__top">
                <span className="skill__icon">
                  <Icon name={skill.icon} size={22} />
                </span>
                <span className="skill__num">0{i + 1}</span>
              </div>
              <h3 className="skill__title">{skill.title}</h3>
              <span className="skill__en">{skill.enTitle}</span>
              <p className="skill__desc">{skill.description}</p>
            </article>
          ))}
        </div>

        <div className="tools" data-reveal>
          <div className="tools__head">
            <span className="tools__label">工具与生态</span>
            <span className="tools__en">TOOLS & WORKFLOW</span>
          </div>
          <ul className="tools__list">
            {tools.map((tool, i) => (
              <li className="tool" key={tool.name} style={{ '--i': i }}>
                <span className="tool__icon">
                  <img className="tool__logo" src={tool.src} alt={tool.name} loading="lazy" />
                </span>
                <span className="tool__name">{tool.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
