import { useId } from 'react'
import Icon from './Icon'

export { fmt } from '../data'

export function Segmented({ label, value, options, onChange, className = '' }) {
  const name = useId()
  return (
    <div role="radiogroup" aria-label={label} className={`segmented ${className}`}>
      {options.map((o) => (
        <label key={o.value} className="segmented__item">
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  )
}

export function Switch({ checked, onChange, children }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="switch" onClick={() => onChange(!checked)}>
      <span className="switch__label">{children}</span>
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
    </button>
  )
}

export function Stars({ value = 5 }) {
  return (
    <span className="stars" role="img" aria-label={`${value} din 5 stele`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={16} filled={i < value} strokeWidth={1.5} />
      ))}
    </span>
  )
}

export function Dots({ level, max = 3, label }) {
  return (
    <span className="dots" role="img" aria-label={label}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < level ? 'is-on' : ''} />
      ))}
    </span>
  )
}

export function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill="var(--accent-fill)" />
      <path
        d="M32 52V30M32 36c-8 0-14-5-14-14 9 0 14 5 14 14zM32 30c0-9 5-14 14-14 0 9-5 14-14 14z"
        fill="none"
        stroke="var(--on-accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
