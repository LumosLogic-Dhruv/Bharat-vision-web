import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'

/* ─────────────────────────────────────────────────────────────
   Aperture — a camera-iris page transition.
   An 8-sided hole is punched through an ink panel with an SVG
   mask; scaling + rotating it reads as iris blades closing.
───────────────────────────────────────────────────────────── */
const SIDES = 8

function polygon(r) {
  const pts = []
  for (let i = 0; i < SIDES; i++) {
    const a = (i / SIDES) * Math.PI * 2 + Math.PI / SIDES
    pts.push([Math.cos(a) * r, Math.sin(a) * r])
  }
  return pts
}

const Aperture = forwardRef(function Aperture(_, ref) {
  const [size, setSize] = useState({ w: 1600, h: 1000 })
  const rootRef = useRef(null)
  const irisRef = useRef(null)
  const bladesRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [count, setCount] = useState(0)

  /* Boot closed so nothing flashes before the intro opens the iris */
  useLayoutEffect(() => {
    setLabel('Calibrating optics')
    gsap.set(rootRef.current, { visibility: 'visible' })
    gsap.set([irisRef.current, bladesRef.current], { scale: 0, rotation: 70, svgOrigin: '0 0' })
  }, [])

  useLayoutEffect(() => {
    const fit = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useImperativeHandle(ref, () => ({
    /* Hole shrinks to nothing: screen fully covered */
    close(nextLabel = '') {
      setLabel(nextLabel)
      const tl = gsap.timeline()
      tl.set(rootRef.current, { visibility: 'visible' })
        .fromTo([irisRef.current, bladesRef.current], { scale: 1, rotation: 0 },
          { scale: 0, rotation: 70, duration: 0.75, ease: 'power3.inOut', svgOrigin: '0 0' })
        .fromTo(labelRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.25')
      return tl
    },
    /* Hole grows back out past the corners */
    open() {
      const tl = gsap.timeline()
      tl.to(labelRef.current, { autoAlpha: 0, y: -10, duration: 0.25, ease: 'power2.in' })
        .fromTo([irisRef.current, bladesRef.current], { scale: 0, rotation: 70 },
          { scale: 1, rotation: 0, duration: 0.95, ease: 'power3.inOut', svgOrigin: '0 0' }, '-=0.05')
        .set(rootRef.current, { visibility: 'hidden' })
      return tl
    },
    /* First visit: count up while "calibrating", then open */
    intro() {
      const o = { v: 0 }
      const tl = gsap.timeline()
      tl.to(o, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => setCount(Math.round(o.v)) })
      tl.add(this.open(), '+=0.1')
      return tl
    },
  }))

  const { w, h } = size
  const R = Math.hypot(w, h) * 0.62
  const pts = polygon(R)
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + 'Z'

  /* Blade edges: extend each polygon side past its vertex */
  const blades = pts.map((p, i) => {
    const prev = pts[(i + SIDES - 1) % SIDES]
    const dx = p[0] - prev[0]
    const dy = p[1] - prev[1]
    const len = Math.hypot(dx, dy)
    return [p[0], p[1], p[0] + (dx / len) * R * 2.4, p[1] + (dy / len) * R * 2.4]
  })

  return (
    <div className="aperture" ref={rootRef} aria-hidden="true">
      <svg width={w} height={h} viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`}>
        <defs>
          <mask id="iris-mask" maskUnits="userSpaceOnUse" x={-w} y={-h} width={w * 2} height={h * 2}>
            <rect x={-w} y={-h} width={w * 2} height={h * 2} fill="#fff" />
            <path ref={irisRef} d={d} fill="#000" />
          </mask>
        </defs>
        <rect x={-w} y={-h} width={w * 2} height={h * 2} fill="var(--ink)" mask="url(#iris-mask)" />
        <g mask="url(#iris-mask)">
          <g ref={bladesRef}>
            {blades.map((b, i) => (
              <line key={i} x1={b[0]} y1={b[1]} x2={b[2]} y2={b[3]} stroke="rgba(244,245,242,0.16)" strokeWidth="1.2" />
            ))}
          </g>
        </g>
      </svg>
      <div className="aperture__label" ref={labelRef}>
        <img src="/bva-logo.png" alt="" className="aperture__logo" />
        <span className="mono">{label}</span>
        {label === 'Calibrating optics' && <span className="mono aperture__count">{count}%</span>}
      </div>
    </div>
  )
})

export default Aperture
