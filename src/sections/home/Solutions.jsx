import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/scroll'
import { SOLUTIONS, WHY } from '../../data/site'
import { Eyebrow, SplitLines } from '../../components/Reveal'

/* ─────────────────────────────────────────────────────────────
   Solutions — a sticky viewer on the left wipes between images
   as each solution scrolls past on the right.
   Why — a ledger of reasons; rows open on hover.
───────────────────────────────────────────────────────────── */
export function Solutions() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const shots = gsap.utils.toArray('.sol__shot', root.current)
      const blocks = gsap.utils.toArray('.sol__block', root.current)
      blocks.forEach((b, i) => {
        if (i === 0) return
        gsap.fromTo(shots[i], { clipPath: 'inset(100% 0 0 0)' }, {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 85%', end: 'top 35%', scrub: true },
        })
        gsap.fromTo(shots[i].querySelector('img'), { scale: 1.25 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 85%', end: 'top 35%', scrub: true },
        })
      })
      gsap.to('.sol__counter-reel', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: { trigger: blocks[1], start: 'top 85%', end: 'top 35%', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="sol" ref={root}>
      <div className="wrap sol__grid">
        <div className="sol__viewer">
          <div className="sol__frame">
            {SOLUTIONS.map((s) => (
              <div key={s.t} className="sol__shot">
                <img src={s.img} alt={s.t} loading="lazy" />
              </div>
            ))}
            <span className="crop crop--tl" /><span className="crop crop--tr" /><span className="crop crop--bl" /><span className="crop crop--br" />
            <div className="sol__counter mono">
              <span className="sol__counter-win"><span className="sol__counter-reel"><span>01</span><span>02</span></span></span>
              <span>/ 02</span>
            </div>
          </div>
        </div>
        <div className="sol__text">
          <Eyebrow index="06">Our machine vision solutions</Eyebrow>
          {SOLUTIONS.map((s, i) => (
            <article key={s.t} className="sol__block">
              <span className="mono muted">0{i + 1}</span>
              <SplitLines as="h3" className="h3">{s.t}</SplitLines>
              <p>{s.d}</p>
              <img src={s.img} alt="" className="sol__inline" loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section className="why">
      <div className="wrap">
        <div className="why__head">
          <Eyebrow index="07">Why choose Bharat Vision</Eyebrow>
          <SplitLines as="h2" className="h2">
            Engineered in-house, <em>supported for life.</em>
          </SplitLines>
        </div>
        <ul className="why__list">
          {WHY.map((w) => (
            <li key={w.n} className="why__row" tabIndex={0}>
              <span className="mono why__n">{w.n}</span>
              <h3>{w.t}</h3>
              <span className="why__m mono">{w.m}</span>
              <div className="why__d">
                <p>{w.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
