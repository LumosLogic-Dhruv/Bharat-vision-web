import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { TLink } from '../lib/transition'
import { useTitle } from '../lib/useTitle'
import { INDUSTRIES, INSPECTION_ITEMS, PRODUCTS } from '../data/site'
import PageHero from '../components/PageHero'
import Marquee from '../components/Marquee'
import Specimen from '../components/Specimen'
import { Eyebrow, Reveal, SplitLines } from '../components/Reveal'
import { Arrow } from '../components/Button'

const CAPABILITIES = [
  'Rubber Stopper Inspection', 'Plastic Cap Inspection', 'Glass Vial Inspection', 'Cosmetic Bottle Inspection',
  'Automotive Component Inspection', '360° Surface Analysis', 'Dimensional Verification', 'AI-Powered Defect Detection',
  'Real-Time Rejection', 'Live Production Analytics', 'Logo & Print Verification', 'Rubber Disc Inspection',
]

/* ─────────────────────────────────────────────────────────────
   Industries stack — each card pins and recedes as the next one
   slides over it, like slides dropping into a viewer.
───────────────────────────────────────────────────────────── */
function Stack() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.stack__card', root.current)
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card.querySelector('.stack__inner'), {
          scale: 0.9,
          opacity: 0.35,
          filter: 'blur(2px)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 14%', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div className="stack" ref={root}>
      {INDUSTRIES.map((ind, i) => {
        const machines = PRODUCTS.filter((p) => p.industries.includes(ind.slug))
        return (
          <div key={ind.slug} className="stack__card" style={{ '--i': i }}>
            <TLink to={`/${ind.slug}`} className="stack__inner" data-cursor="Explore">
              <div className="stack__copy">
                <span className="mono">Industry · 0{i + 1}</span>
                <h2>{ind.name}</h2>
                <p>{ind.summary}</p>
                <div className="stack__chips">
                  {machines.map((m) => <span key={m.slug} className="mono">{m.short}</span>)}
                </div>
                <span className="stack__go">Learn more <Arrow /></span>
              </div>
              <div className="stack__img">
                <img src={ind.hero} alt="" loading="lazy" />
              </div>
            </TLink>
          </div>
        )
      })}
    </div>
  )
}

export default function WeInspect() {
  useTitle('We Inspect')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'We Inspect' }]}
        kicker="Industries we serve"
        index="03 industries"
        title={<>We <em>inspect.</em></>}
        lede="Precision machine vision systems for quality assurance across industries — advanced inspection tailored for each sector's unique quality requirements."
      />
      <section className="wrap pg-sec pg-sec--tight">
        <Stack />
      </section>

      <section className="pg-sec cap-band">
        <div className="wrap sec-head">
          <Eyebrow index="02">Inspection capabilities we deliver</Eyebrow>
        </div>
        <Marquee items={CAPABILITIES.slice(0, 6)} />
        <Marquee items={CAPABILITIES.slice(6)} reverse />
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="03">The specimen library</Eyebrow>
          <SplitLines as="h2" className="h2">Components <em>we inspect.</em></SplitLines>
        </div>
        <Reveal className="tray__grid" stagger={0.04} y={24}>
          {INSPECTION_ITEMS.map((it, i) => (
            <Specimen key={it.src} name={it.name} src={it.src} index={i} industry={it.industry} />
          ))}
        </Reveal>
      </section>
    </>
  )
}
