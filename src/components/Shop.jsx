import { useMemo } from 'react'
import Icon from './Icon'
import Photo from './Photo'
import { Segmented, Switch, fmt } from './ui'
import { PRODUCTS, LIGHT } from '../data'

export const CARE_LABEL = ['', 'Ușor', 'Moderat', 'Pretențios']
export const WATER_LABEL = ['', 'La 2–3 săptămâni', 'Săptămânal', 'De două ori pe săptămână']

const LIGHT_OPTIONS = [
  { value: 'all', label: 'Orice lumină' },
  { value: 'low', label: LIGHT.low.short },
  { value: 'medium', label: LIGHT.medium.short },
  { value: 'bright', label: LIGHT.bright.short },
]

const SORTS = {
  featured: { label: 'Recomandate', fn: () => 0 },
  'price-asc': { label: 'Preț: crescător', fn: (a, b) => a.prices[0] - b.prices[0] },
  'price-desc': { label: 'Preț: descrescător', fn: (a, b) => b.prices[0] - a.prices[0] },
  name: { label: 'Nume', fn: (a, b) => a.name.localeCompare(b.name, 'ro') },
}

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function filterProducts({ q, light, pet, sort }) {
  const term = normalize(q.trim())
  return PRODUCTS.filter(
    (p) =>
      (light === 'all' || p.light === light) &&
      (!pet || p.petSafe) &&
      (!term || normalize(`${p.name} ${p.latin}`).includes(term)),
  ).sort(SORTS[sort].fn)
}

function ProductCard({ product: p, onOpen, onQuickAdd }) {
  return (
    <li className="card">
      <div className="card__media" style={{ '--hue': p.hue }}>
        <Photo id={p.photo} alt={p.alt} width={600} sizes="(min-width: 1184px) 264px, (min-width: 600px) 30vw, 46vw" />
        {p.badge && <span className="badge">{p.badge}</span>}
        {p.petSafe && (
          <span className="pet-tag">
            <Icon name="paw" size={14} strokeWidth={2} />
            Sigură pentru animale
          </span>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">
          <button type="button" className="card__open" onClick={() => onOpen(p)}>
            {p.name}
          </button>
        </h3>
        <p className="card__latin">{p.latin}</p>
        <p className="card__meta">
          <Icon name="sun" size={16} />
          {LIGHT[p.light].label} · {CARE_LABEL[p.care]}
        </p>
        <div className="card__foot">
          <span className="price">De la {fmt(p.prices[0])}</span>
          <button type="button" className="icon-btn icon-btn--filled" onClick={() => onQuickAdd(p)} aria-label={`Adaugă ${p.name} în coș`}>
            <Icon name="plus" size={20} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default function Shop({ filters, setFilters, onOpen, onQuickAdd }) {
  const list = useMemo(() => filterProducts(filters), [filters])
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }))
  const isDefault = !filters.q && filters.light === 'all' && !filters.pet

  return (
    <section id="shop" className="section shop" aria-labelledby="shop-title">
      <div className="section__head">
        <h2 id="shop-title" className="section__title">
          Cumpără plante.
        </h2>
        <p className="section__lead">Douăsprezece favorite, crescute pentru viața în casă. Alege după lumină sau după prima impresie.</p>
      </div>

      <div className="toolbar">
        <label className="search">
          <Icon name="search" size={20} />
          <span className="sr-only">Caută plante</span>
          <input
            type="search"
            name="q"
            placeholder="Caută plante"
            value={filters.q}
            onChange={(e) => set({ q: e.target.value })}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <div className="toolbar__row">
          <Segmented label="Nivel de lumină" value={filters.light} onChange={(light) => set({ light })} options={LIGHT_OPTIONS} />
          <Switch checked={filters.pet} onChange={(pet) => set({ pet })}>
            <Icon name="paw" size={18} />
            Doar pentru animale
          </Switch>
          <label className="select">
            <span className="sr-only">Sortează după</span>
            <select name="sort" value={filters.sort} onChange={(e) => set({ sort: e.target.value })}>
              {Object.entries(SORTS).map(([value, s]) => (
                <option key={value} value={value}>
                  {s.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={16} strokeWidth={2.25} />
          </label>
        </div>
      </div>

      <p className="result-count" role="status">
        {list.length} {list.length === 1 ? 'plantă' : 'plante'}
        {!isDefault && (
          <>
            {' · '}
            <button type="button" className="link-btn" onClick={() => setFilters({ q: '', light: 'all', pet: false, sort: filters.sort })}>
              Șterge filtrele
            </button>
          </>
        )}
      </p>

      {list.length > 0 ? (
        <ul className="grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} onQuickAdd={onQuickAdd} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <Icon name="leaf" size={40} strokeWidth={1.5} />
          <h3>Nicio plantă găsită</h3>
          <p>Încearcă alt nivel de lumină sau dezactivează filtrul pentru animale.</p>
          <button type="button" className="btn btn--tinted" onClick={() => setFilters({ q: '', light: 'all', pet: false, sort: 'featured' })}>
            Resetează filtrele
          </button>
        </div>
      )}
    </section>
  )
}
