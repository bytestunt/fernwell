import { useEffect, useState } from 'react'
import Icon from './Icon'
import { Segmented, LogoMark } from './ui'

const THEMES = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Luminos' },
  { value: 'dark', label: 'Întunecat' },
]

function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="signup" aria-labelledby="signup-title">
      <div className="signup__copy">
        <h2 id="signup-title" className="signup__title">
          10% reducere la prima plantă.
        </h2>
        <p className="signup__lead">Abonează-te și primești noutăți și sfaturi de îngrijire pe e-mail.</p>
      </div>
      {done ? (
        <p className="signup__done" role="status">
          <Icon name="check" size={20} strokeWidth={2.5} /> Mulțumim, ești abonat.
        </p>
      ) : (
        <form
          className="signup__form"
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
        >
          <label className="sr-only" htmlFor="email">
            Adresă de e-mail
          </label>
          <input id="email" name="email" type="email" required placeholder="Adresă de e-mail" autoComplete="email" inputMode="email" enterKeyHint="send" />
          <button type="submit" className="btn btn--primary">
            Abonează-te
          </button>
        </form>
      )}
    </section>
  )
}

export default function Footer() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('fernwell-theme') || 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') delete root.dataset.theme
    else root.dataset.theme = theme
    try {
      if (theme === 'system') localStorage.removeItem('fernwell-theme')
      else localStorage.setItem('fernwell-theme', theme)
    } catch {}
  }, [theme])

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Newsletter />
        <div className="footer__bar">
          <a className="brand" href="#top">
            <LogoMark size={24} />
            <span>Fernwell</span>
          </a>
          <div className="footer__right">
            <Segmented label="Aspect" value={theme} onChange={setTheme} options={THEMES} className="segmented--small" />
            <a className="to-top" href="#top">
              Înapoi sus <Icon name="arrowUp" size={16} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
