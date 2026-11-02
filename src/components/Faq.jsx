import Icon from './Icon'
import { FAQS } from '../data'

export default function Faq() {
  return (
    <section id="faq" className="section section--narrow" aria-labelledby="faq-title">
      <div className="section__head">
        <h2 id="faq-title" className="section__title">
          Bine de știut.
        </h2>
      </div>
      <div className="faq">
        {FAQS.map((f, i) => (
          <details key={f.q} name="faq" open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <Icon name="chevronDown" size={20} strokeWidth={2.25} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
