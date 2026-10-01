import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

/* ─────────────────────────────────────────────────────────────
   Reticle cursor — a measuring crosshair with live coordinates.
   Grows into a labelled ring over anything with [data-cursor].
───────────────────────────────────────────────────────────── */
export default function Cursor() {
  const root = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const coords = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    const el = root.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3' })

    const move = (e) => {
      if (el.classList.contains('is-idle')) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        el.classList.remove('is-idle')
      }
      xTo(e.clientX)
      yTo(e.clientY)
      coords.current.textContent = `${String(e.clientX).padStart(4, '0')} · ${String(e.clientY).padStart(4, '0')}`
    }
    const over = (e) => {
      const t = e.target.closest('a, button, [data-cursor], input, textarea, select, label')
      const text = t?.dataset?.cursor
      el.classList.toggle('is-hover', !!t)
      el.classList.toggle('is-label', !!text)
      el.classList.toggle('is-hidden', !!e.target.closest('[data-cursor-hide]'))
      label.current.textContent = text || ''
    }
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.15 })
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3, ease: 'back.out(3)' })
    const leave = () => el.classList.add('is-hidden')

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="cursor is-idle" ref={root} aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span className="cursor__label" ref={label} />
      </div>
      <span className="cursor__h" />
      <span className="cursor__v" />
      <span className="cursor__coords mono" ref={coords} />
    </div>
  )
}
