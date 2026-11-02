import { useState } from 'react'
import Icon from './Icon'
import Photo from './Photo'
import { Segmented } from './ui'
import { PRODUCTS, LIGHT } from '../data'

const OPTIONS = [
  { value: 'low', label: LIGHT.low.short },
  { value: 'medium', label: LIGHT.medium.short },
  { value: 'bright', label: LIGHT.bright.short },
]

export default function Care({ onOpen, onShowLight, onShowPetSafe }) {
  const [level, setLevel] = useState('medium')
  const matches = PRODUCTS.filter((p) => p.light === level)

  return (
    <section id="care" className="section section--tinted" aria-labelledby="care-title">
      <div className="section__inner">
        <div className="section__head">
          <h2 id="care-title" className="section__title">
            Îngrijire simplă.
          </h2>
          <p className="section__lead">Majoritatea plantelor au nevoie de trei lucruri: lumina potrivită, puțină apă și liniște.</p>
        </div>

        <div className="bento">
          <article className="tile tile--finder">
            <h3 className="tile__title">Cât de multă lumină primește camera ta?</h3>
            <Segmented label="Lumina din camera ta" value={level} onChange={setLevel} options={OPTIONS} />
            <div className="finder__text" aria-live="polite">
              <p className="finder__where">
                <Icon name="sun" size={18} /> <span>{LIGHT[level].where}</span>
              </p>
            </div>
            <ul className="finder__plants" aria-label={`Plante pentru ${LIGHT[level].label.toLowerCase()}`}>
              {matches.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => onOpen(p)} style={{ '--hue': p.hue }}>
                    <span className="finder__thumb">
                      <Photo id={p.photo} alt="" width={200} />
                    </span>
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="link-more" onClick={() => onShowLight(level)}>
              Vezi toate cele {matches.length} plante
              <Icon name="chevronRight" size={18} strokeWidth={2.25} />
            </button>
          </article>

          <article className="tile tile--water">
            <span className="tile__icon">
              <Icon name="drop" size={28} />
            </span>
            <h3 className="tile__title">Mai puțină decât crezi.</h3>
            <p className="tile__text">
              Bagă degetul 5 cm în sol. <strong>E uscat?</strong> E timpul să uzi. <strong>E umed?</strong> Mai așteaptă câteva zile.
            </p>
          </article>

          <article className="tile tile--wide">
            <span className="tile__icon">
              <Icon name="paw" size={28} />
            </span>
            <h3 className="tile__title">Plante sigure pentru animale.</h3>
            <p className="tile__text">Multe plante sunt toxice dacă sunt mestecate. Vezi-le doar pe cele sigure pentru pisici și câini.</p>
            <button type="button" className="link-more" onClick={onShowPetSafe}>
              Arată plantele sigure
              <Icon name="chevronRight" size={18} strokeWidth={2.25} />
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
