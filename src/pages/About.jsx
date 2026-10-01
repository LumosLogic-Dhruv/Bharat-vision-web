import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { useTitle } from '../lib/useTitle'
import { ABOUT, STATS } from '../data/site'
import PageHero from '../components/PageHero'
import Odometer from '../components/Odometer'
import { Eyebrow, Reveal, SplitLines } from '../components/Reveal'
import Button from '../components/Button'

/* ─────────────────────────────────────────────────────────────
   Journey — a big sticky year on the left rolls to each
   milestone as its entry crosses the middle of the screen.
───────────────────────────────────────────────────────────── */
function Journey() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.jr__item').forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => self.isActive && setActive(i),
          },
        })
      })
      if (!prefersReducedMotion()) {
        gsap.fromTo('.jr__rule i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.jr__list', start: 'top 55%', end: 'bottom 55%', scrub: true } })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="jr" ref={root}>
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow index="05">Our journey · since 1975</Eyebrow>
          <SplitLines as="h2" className="h2">Five decades of <em>looking closer.</em></SplitLines>
        </div>
        <div className="jr__grid">
          <div className="jr__sticky">
            <div className="jr__year-win">
              <div className="jr__year-reel" style={{ transform: `translateY(${-active * 100 / ABOUT.journey.length}%)` }}>
                {ABOUT.journey.map((j) => <span key={j.y}>{j.y}</span>)}
              </div>
            </div>
            <div className="jr__dots">
              {ABOUT.journey.map((j, i) => <span key={j.y} className={i <= active ? 'is-on' : ''} />)}
            </div>
          </div>
          <div className="jr__list">
            <div className="jr__rule" aria-hidden="true"><i /></div>
            {ABOUT.journey.map((j, i) => (
              <article key={j.y} className={`jr__item ${i === active ? 'is-active' : ''}`}>
                <span className="mono jr__y">{j.y}</span>
                <h3>{j.t}</h3>
                <p>{j.d}</p>
                <div className="jr__tags">
                  {j.tags.map((t) => <span key={t} className="mono">{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* SMART goals — five columns; the focused one opens up */
function Smart() {
  const [open, setOpen] = useState(0)
  return (
    <section className="wrap pg-sec">
      <div className="sec-head sec-head--row">
        <div>
          <Eyebrow index="04">SMART goals framework</Eyebrow>
          <SplitLines as="h2" className="h2">Strategic excellence, <em>letter by letter.</em></SplitLines>
        </div>
      </div>
      <div className="smart" role="tablist">
        {ABOUT.smart.map((s, i) => (
          <button
            key={s.l}
            role="tab"
            aria-selected={open === i}
            className={`smart__col ${open === i ? 'is-open' : ''}`}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(i)}
          >
            <span className="smart__letter">{s.l}</span>
            <span className="smart__body">
              <strong>{s.t}</strong>
              <span>{s.d}</span>
            </span>
            <span className="mono smart__n">0{i + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default function About() {
  useTitle('About')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        kicker="About us"
        index="Est. 1975"
        title={<>Innovation in <em>machine vision.</em></>}
        lede="Since 1975 — pioneering automated inspection technology across pharmaceutical, packaging, medical device and automotive industries."
        image="/images/banner/16.jpg"
      />

      <section className="wrap pg-sec ind-over">
        <Eyebrow index="01">About our business</Eyebrow>
        <div>
          <SplitLines as="p" className="ind-over__lead">{ABOUT.intro[0]}</SplitLines>
          <Reveal as="p" className="ind-over__p">{ABOUT.intro[1]}</Reveal>
        </div>
      </section>

      <section className="wrap pg-sec pg-sec--tight">
        <Reveal className="about-stats" stagger={0.1}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="about-stats__v"><Odometer value={s.value} suffix={s.suffix} /></div>
              <p className="mono">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="02">Our values</Eyebrow>
          <SplitLines as="h2" className="h2">What <em>drives</em> us.</SplitLines>
        </div>
        <Reveal className="values" stagger={0.1}>
          {ABOUT.values.map((v, i) => (
            <article key={v.t} className="value">
              <div className="value__img"><img src={v.img} alt="" loading="lazy" /></div>
              <span className="mono">0{i + 1}</span>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="pg-sec vm">
        <div className="wrap vm__grid">
          {[
            { k: 'Our vision', t: ABOUT.vision },
            { k: 'Our mission', t: ABOUT.mission },
          ].map((x, i) => (
            <div key={x.k} className="vm__item">
              <span className="mono">0{i + 1} · {x.k}</span>
              <SplitLines as="p" className="vm__text">{x.t}</SplitLines>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head sec-head--row">
          <div>
            <Eyebrow index="03">Our expertise</Eyebrow>
            <SplitLines as="h2" className="h2">Advanced <em>capabilities.</em></SplitLines>
          </div>
        </div>
        <Reveal className="caps caps--4" stagger={0.07}>
          {ABOUT.expertise.map((c, i) => (
            <div key={c.t} className="cap">
              <span className="cap__n mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </Reveal>
        <div className="tech">
          <span className="mono">Technology &amp; innovation</span>
          {ABOUT.tech.map((t) => (
            <Reveal key={t.t} className="tech__row">
              <strong>{t.t}</strong>
              <p>{t.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Smart />
      <Journey />

      <section className="wrap pg-sec partner">
        <SplitLines as="h2" className="h2">Partner <em>with us.</em></SplitLines>
        <p className="lede">Join hundreds of satisfied clients who trust Bharat Vision Automation.</p>
        <Button to="/contact">Contact Us</Button>
      </section>
    </>
  )
}
