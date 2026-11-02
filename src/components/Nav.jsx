import Icon from './Icon'
import { LogoMark } from './ui'

const LINKS = [
  { id: 'shop', label: 'Magazin', icon: 'leaf' },
  { id: 'care', label: 'Îngrijire', icon: 'drop' },
  { id: 'reviews', label: 'Recenzii', icon: 'star' },
  { id: 'faq', label: 'Întrebări', icon: 'shield' },
]

export default function Nav({ active, cartCount, onCart }) {
  return (
    <>
      <header className="nav-wrap">
        <nav className="nav glass" aria-label="Principală">
          <a className="brand" href="#top">
            <LogoMark />
            <span>Fernwell</span>
          </a>
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="icon-btn nav__cart"
            onClick={onCart}
            aria-label={`Coș, ${cartCount} ${cartCount === 1 ? 'produs' : 'produse'}`}
          >
            <Icon name="bag" />
            {cartCount > 0 && (
              <span className="count" key={cartCount} aria-hidden="true">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      <nav className="tabbar glass" aria-label="Secțiuni">
        <a href="#top" aria-current={active === 'top' ? 'true' : undefined}>
          <Icon name="home" size={24} />
          <span>Acasă</span>
        </a>
        {LINKS.slice(0, 3).map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
            <Icon name={l.icon} size={24} />
            <span>{l.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
