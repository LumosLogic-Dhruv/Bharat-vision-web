import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll'

/* Endless ticker whose speed and direction follow scroll velocity */
export default function Marquee({ items, reverse = false }) {
  const track = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = track.current
    let x = 0
    let boost = 0
    let dir = reverse ? 1 : -1
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        boost = Math.min(Math.abs(self.getVelocity()) / 120, 14)
        dir = (self.direction > 0 ? -1 : 1) * (reverse ? -1 : 1)
      },
    })
    const tick = () => {
      const half = el.scrollWidth / 2
      x += dir * (0.6 + boost)
      boost *= 0.92
      if (x <= -half) x += half
      if (x > 0) x -= half
      gsap.set(el, { x })
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
    }
  }, [reverse])

  const row = [...items, ...items]
  return (
    <div className="marq" aria-hidden="true">
      <div className="marq__track" ref={track}>
        {row.map((t, i) => (
          <span key={i} className="marq__item">
            {t}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /></svg>
          </span>
        ))}
      </div>
    </div>
  )
}
