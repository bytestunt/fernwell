import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Stars } from './ui'
import { REVIEWS } from '../data'

export default function Reviews() {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = () => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }
  useEffect(update, [])

  const page = (dir) => {
    const el = track.current
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="section reviews" aria-labelledby="reviews-title">
      <div className="section__head section__head--row">
        <div>
          <h2 id="reviews-title" className="section__title">
            Îndrăgite de iubitorii de plante.
          </h2>
          <p className="section__lead">Ce spun clienții noștri.</p>
        </div>
        <div className="pager">
          <button type="button" className="icon-btn icon-btn--glass" onClick={() => page(-1)} disabled={edge.start} aria-label="Recenziile anterioare">
            <Icon name="chevronLeft" strokeWidth={2.25} />
          </button>
          <button type="button" className="icon-btn icon-btn--glass" onClick={() => page(1)} disabled={edge.end} aria-label="Recenziile următoare">
            <Icon name="chevronRight" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <ul className="carousel" ref={track} onScroll={update} tabIndex={0} aria-label="Recenziile clienților">
        {REVIEWS.map((r) => (
          <li key={r.name} className="review">
            <Stars value={5} />
            <blockquote>“{r.text}”</blockquote>
            <p className="review__who">
              <strong>{r.name}</strong>
              <span>A cumpărat: {r.plant}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
