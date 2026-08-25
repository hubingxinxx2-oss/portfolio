export default function SectionHeading({ index, title, en }) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-heading__text">
        <h2 className="section-heading__title">{title}</h2>
        <span className="section-heading__en">{en}</span>
      </div>
    </div>
  )
}
