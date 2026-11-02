import { useEffect, useState } from 'react'
import Sheet from './Sheet'
import Icon from './Icon'
import Photo from './Photo'
import { fmt } from './ui'
import { SIZES, FREE_SHIPPING_AT, SHIPPING_FLAT } from '../data'

function Line({ line, onQty, onRemove }) {
  const { product: p, size, qty, unit } = line
  const sizeLabel = SIZES.find((s) => s.id === size)
  return (
    <li className="line">
      <div className="line__thumb" style={{ '--hue': p.hue }}>
        <Photo id={p.photo} alt="" width={160} />
      </div>
      <div className="line__info">
        <p className="line__name">{p.name}</p>
        <p className="line__sub">
          {sizeLabel.label} · {sizeLabel.detail}
        </p>
        <div className="stepper" role="group" aria-label={`Cantitate: ${p.name}`}>
          <button type="button" onClick={() => onQty(line.key, -1)} aria-label={qty === 1 ? `Elimină ${p.name}` : `Scade cantitatea pentru ${p.name}`}>
            <Icon name={qty === 1 ? 'trash' : 'minus'} size={16} strokeWidth={2.25} />
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" onClick={() => onQty(line.key, 1)} aria-label={`Mărește cantitatea pentru ${p.name}`} disabled={qty >= 9}>
            <Icon name="plus" size={16} strokeWidth={2.25} />
          </button>
        </div>
      </div>
      <p className="line__price">{fmt(unit * qty)}</p>
    </li>
  )
}

export default function CartSheet({ open, onClose, lines, subtotal, onQty, onRemove, onCheckout, toastSlot }) {
  const [stage, setStage] = useState('cart')

  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setStage('cart'), 400)
    return () => clearTimeout(t)
  }, [open])

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)

  return (
    <Sheet open={open} onClose={onClose} label="Coș de cumpărături" variant="side">
      {stage === 'done' ? (
        <div className="cart cart--done">
          <div className="done__mark" aria-hidden="true">
            <Icon name="check" size={44} strokeWidth={2.5} />
          </div>
          <h2 className="cart__title">Comandă plasată.</h2>
          <p className="done__text">Mulțumim pentru interes! Nu s-a încasat nicio plată și nimic nu va fi expediat.</p>
          <button type="button" className="btn btn--primary btn--large" onClick={onClose}>
            Continuă cumpărăturile
          </button>
        </div>
      ) : (
        <div className="cart">
          <h2 className="cart__title">Coș</h2>

          {lines.length === 0 ? (
            <div className="cart__empty">
              <Icon name="bag" size={44} strokeWidth={1.4} />
              <p className="cart__empty-title">Coșul tău este gol</p>
              <p>Plantele pe care le adaugi vor apărea aici.</p>
              <button type="button" className="btn btn--tinted" onClick={onClose}>
                Începe cumpărăturile
              </button>
            </div>
          ) : (
            <>
              <div className="ship">
                <p>
                  {remaining === 0 && <Icon name="check" size={16} strokeWidth={2.5} />}
                  <span>
                    {remaining > 0 ? (
                      <>
                        Mai ai <strong>{fmt(remaining)}</strong> până la livrarea gratuită.
                      </>
                    ) : (
                      <>
                        Ai <strong>livrare gratuită</strong>.
                      </>
                    )}
                  </span>
                </p>
                <div className="ship__bar" role="progressbar" aria-label="Progres spre livrarea gratuită" aria-valuemin={0} aria-valuemax={FREE_SHIPPING_AT} aria-valuenow={Math.min(subtotal, FREE_SHIPPING_AT)}>
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <ul className="lines">
                {lines.map((line) => (
                  <Line key={line.key} line={line} onQty={onQty} onRemove={onRemove} />
                ))}
              </ul>

              <div className="cart__foot">
                <dl className="totals">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{fmt(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Livrare</dt>
                    <dd>{shipping === 0 ? 'Gratuită' : fmt(shipping)}</dd>
                  </div>
                  <div className="totals__total">
                    <dt>Total</dt>
                    <dd>{fmt(subtotal + shipping)}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="btn btn--primary btn--large btn--block"
                  onClick={() => {
                    onCheckout()
                    setStage('done')
                  }}
                >
                  Finalizează comanda
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {toastSlot}
    </Sheet>
  )
}
