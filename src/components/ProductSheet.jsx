import { useState } from 'react'
import Sheet from './Sheet'
import Icon from './Icon'
import Photo from './Photo'
import { Segmented, Dots, fmt } from './ui'
import { CARE_LABEL, WATER_LABEL } from './Shop'
import { SIZES, LIGHT } from '../data'

const LIGHT_LEVEL = { low: 1, medium: 2, bright: 3 }

function Detail({ product: p, onAdd }) {
  const [size, setSize] = useState('m')
  const price = p.prices[SIZES.findIndex((s) => s.id === size)]
  const chosen = SIZES.find((s) => s.id === size)

  return (
    <div className="detail">
      <div className="detail__media" style={{ '--hue': p.hue }}>
        <Photo id={p.photo} alt={p.alt} width={900} sizes="(min-width: 760px) 480px, 100vw" eager />
      </div>

      <div className="detail__info">
        <div>
          <h2 className="detail__title">{p.name}</h2>
          <p className="detail__latin">{p.latin}</p>
        </div>
        <p className="detail__price" aria-live="polite">
          {fmt(price)}
        </p>
        <p className="detail__blurb">{p.blurb}</p>

        <div className="field">
          <span className="field__label">
            Mărime · <span>{chosen.detail}</span>
          </span>
          <Segmented
            label="Mărime"
            value={size}
            onChange={setSize}
            options={SIZES.map((s, i) => ({ value: s.id, label: `${s.label} · ${fmt(p.prices[i])}` }))}
          />
        </div>

        <dl className="facts">
          <div>
            <dt>
              <Icon name="sun" size={18} /> Lumină
            </dt>
            <dd>
              {LIGHT[p.light].label}
              <Dots level={LIGHT_LEVEL[p.light]} label={`Nevoie de lumină: ${LIGHT_LEVEL[p.light]} din 3`} />
            </dd>
          </div>
          <div>
            <dt>
              <Icon name="drop" size={18} /> Apă
            </dt>
            <dd>
              {WATER_LABEL[p.water]}
              <Dots level={p.water} label={`Nevoie de apă: ${p.water} din 3`} />
            </dd>
          </div>
          <div>
            <dt>
              <Icon name="leaf" size={18} /> Îngrijire
            </dt>
            <dd>
              {CARE_LABEL[p.care]}
              <Dots level={p.care} label={`Dificultate: ${p.care} din 3`} />
            </dd>
          </div>
          <div>
            <dt>
              <Icon name="paw" size={18} /> Animale
            </dt>
            <dd>{p.petSafe ? 'Netoxică pentru pisici și câini' : 'Toxică dacă e mestecată. Ține-o departe de animale'}</dd>
          </div>
        </dl>

        <button type="button" className="btn btn--primary btn--large btn--block" onClick={() => onAdd({ id: p.id, size })}>
          Adaugă în coș · {fmt(price)}
        </button>
      </div>
    </div>
  )
}

export default function ProductSheet({ product, open, onClose, onAdd }) {
  return (
    <Sheet open={open} onClose={onClose} label={product ? `Detalii: ${product.name}` : 'Detalii plantă'} variant="modal">
      {product && <Detail key={product.id} product={product} onAdd={onAdd} />}
    </Sheet>
  )
}
