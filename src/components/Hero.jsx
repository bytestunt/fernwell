import Icon from './Icon'
import Photo from './Photo'
import { FREE_SHIPPING_AT, HERO_PHOTO, fmt } from '../data'

const PERKS = [
  { icon: 'truck', title: 'Livrare gratuită', text: `La comenzi de peste ${fmt(FREE_SHIPPING_AT)}` },
  { icon: 'shield', title: 'Garanție 30 de zile', text: 'Înlocuire sau rambursare, fără bătăi de cap' },
  { icon: 'box', title: 'Fără plastic', text: 'Doar hârtie și carton reciclat' },
]

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          Adu natura
          <br />
          în <span className="hero__accent">casă.</span>
        </h1>
        <p className="hero__lead">Plante de apartament sănătoase, alese și ghivecite manual, livrate la ușa ta.</p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--large" href="#shop">
            Cumpără plante
          </a>
          <a className="link-more" href="#care">
            Găsește planta potrivită
            <Icon name="chevronRight" size={18} strokeWidth={2.25} />
          </a>
        </div>
      </div>

      <div className="hero__stage">
        <Photo
          id={HERO_PHOTO}
          ratio={1.6}
          width={1200}
          sizes="(min-width: 1184px) 1056px, 100vw"
          alt="Raft plin de plante de apartament într-un magazin luminos"
          eager
        />
      </div>

      <ul className="perks" aria-label="De ce Fernwell">
        {PERKS.map((p) => (
          <li key={p.title}>
            <span className="perks__icon">
              <Icon name={p.icon} size={22} />
            </span>
            <span>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
