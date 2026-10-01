import { useMemo } from 'react'

/* ─────────────────────────────────────────────────────────────
   Specimen — a component on the inspection tray. On hover the
   camera "locks on": corner brackets close in, a scan passes and
   the verdict + confidence read out.
───────────────────────────────────────────────────────────── */
export default function Specimen({ name, src, index, industry }) {
  // stable pseudo-random confidence per item
  const conf = useMemo(() => {
    let h = 0
    for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 1000
    return (99.1 + (h % 88) / 100).toFixed(2)
  }, [name])

  return (
    <figure className="spec" data-cursor="Inspect">
      <div className="spec__img">
        <img src={src} alt={name} loading="lazy" />
        <span className="spec__scan" aria-hidden="true" />
        <span className="spec__box" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="spec__verdict mono" aria-hidden="true">
          <span className="dot dot--pass" /> PASS · {conf}%
        </span>
      </div>
      <figcaption>
        <span className="mono">{String(index + 1).padStart(2, '0')}{industry ? ` · ${industry}` : ''}</span>
        <strong>{name}</strong>
      </figcaption>
    </figure>
  )
}
