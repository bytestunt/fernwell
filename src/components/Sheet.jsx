import { useEffect, useRef } from 'react'
import Icon from './Icon'

export default function Sheet({ open, onClose, label, variant = 'modal', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open) {
      dialog.dataset.state = 'open'
      if (!dialog.open) {
        dialog.showModal()
        dialog.querySelector('.sheet__surface')?.focus({ preventScroll: true })
      }
      document.documentElement.classList.add('scroll-locked')
      return
    }
    if (dialog.open) {
      dialog.dataset.state = 'closing'
      const t = setTimeout(() => {
        dialog.close()
        dialog.dataset.state = ''
        document.documentElement.classList.remove('scroll-locked')
      }, 220)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`sheet sheet--${variant}`}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="sheet__surface" tabIndex={-1}>
        <span className="sheet__grabber" aria-hidden="true" />
        <button type="button" className="sheet__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} strokeWidth={2.25} />
        </button>
        {children}
      </div>
    </dialog>
  )
}
