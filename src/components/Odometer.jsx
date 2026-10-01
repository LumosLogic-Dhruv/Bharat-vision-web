import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'

/* Rolling-digit counter: each digit is a 0–9 reel that spins into place */
export default function Odometer({ value, suffix = '' }) {
  const ref = useRef(null)
  const digits = String(value).split('')

  useLayoutEffect(() => {
    const reels = ref.current.querySelectorAll('.odo__reel')
    if (prefersReducedMotion()) {
      reels.forEach((r, i) => gsap.set(r, { yPercent: -Number(digits[i]) * 5 }))
      return
    }
    const ctx = gsap.context(() => {
      reels.forEach((r, i) => {
        const d = Number(digits[i])
        gsap.fromTo(r, { yPercent: 0 }, {
          yPercent: -(d + 10) * (100 / 20),
          duration: 2 + i * 0.35,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span className="odo tnum" ref={ref} aria-label={`${value}${suffix}`}>
      {digits.map((_, i) => (
        <span key={i} className="odo__win" aria-hidden="true">
          <span className="odo__reel">
            {Array.from({ length: 20 }, (_, n) => (
              <span key={n}>{n % 10}</span>
            ))}
          </span>
        </span>
      ))}
      {suffix && <span className="odo__suf" aria-hidden="true">{suffix}</span>}
    </span>
  )
}
