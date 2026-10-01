import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, introDelay, prefersReducedMotion } from '../lib/scroll'
import { TLink } from '../lib/transition'
import { SplitLines } from './Reveal'

/* ─────────────────────────────────────────────────────────────
   Inner-page hero: breadcrumb trail, masked headline and an
   optional image plate that opens like a shutter.
───────────────────────────────────────────────────────────── */
export default function PageHero({ crumbs = [], title, kicker, lede, image, index, children }) {
  const root = useRef(null)
  const [delay] = useState(() => introDelay())

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-in]', { y: 24, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: delay + 0.3 })
      if (image) {
        gsap.fromTo('.ph__img', { clipPath: 'inset(0 0 100% 0 round 28px)' }, { clipPath: 'inset(0 0 0% 0 round 28px)', duration: 1.5, ease: 'expo.inOut', delay: delay - 0.1 })
        gsap.fromTo('.ph__img img', { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out', delay: delay - 0.1 })
        gsap.to('.ph__img img', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.ph__img', start: 'top top', end: 'bottom top', scrub: true } })
      }
    }, root)
    return () => ctx.revert()
  }, [delay, image])

  return (
    <section className={`ph ${image ? 'ph--img' : ''}`} ref={root}>
      <div className="wrap">
        <nav className="ph__crumbs mono" aria-label="Breadcrumb" data-in>
          <TLink to="/" className="link-u">Home</TLink>
          {crumbs.map((c) => (
            <span key={c.label}>
              <i>/</i>
              {c.to ? <TLink to={c.to} className="link-u">{c.label}</TLink> : <b>{c.label}</b>}
            </span>
          ))}
        </nav>
        <div className="ph__row">
          <div>
            {kicker && <p className="ph__kicker mono" data-in>{index && <span>{index}</span>}{kicker}</p>}
            <SplitLines as="h1" className="ph__title" immediate delay={delay}>
              {title}
            </SplitLines>
          </div>
          {lede && <p className="ph__lede" data-in>{lede}</p>}
        </div>
        {children}
      </div>
      {image && (
        <div className="wrap">
          <div className="ph__img">
            <img src={image} alt="" />
            <span className="crop crop--tl" /><span className="crop crop--tr" /><span className="crop crop--bl" /><span className="crop crop--br" />
          </div>
        </div>
      )}
    </section>
  )
}
