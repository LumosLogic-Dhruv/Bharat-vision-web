import { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gsap, introDelay, prefersReducedMotion } from '../lib/scroll'
import { TLink } from '../lib/transition'
import { useTitle } from '../lib/useTitle'
import { PRODUCTS, INDUSTRIES, productBySlug } from '../data/site'
import { Eyebrow, Reveal, SplitLines } from '../components/Reveal'
import Button from '../components/Button'
import MachineCard from '../components/MachineCard'
import NotFound from './NotFound'

const fmt = new Intl.NumberFormat('en-IN')

function Hero({ p }) {
  const root = useRef(null)
  const [delay] = useState(() => introDelay())
  const [w, , h] = p.dims.includes('×') ? p.dims.replace(' mm', '').split(' × ') : []

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-in]', { y: 24, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.07, delay: delay + 0.3 })
      gsap.from('.pd__machine img', { y: 60, scale: 0.92, autoAlpha: 0, duration: 1.6, ease: 'expo.out', delay: delay })
      gsap.from('.pd__dim', { scale: 0, duration: 1.2, ease: 'expo.out', delay: delay + 0.6, stagger: 0.15 })
      gsap.to('.pd__machine img', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [delay, p.slug])

  return (
    <section className="pd-hero" ref={root}>
      <div className="wrap pd-hero__grid">
        <div className="pd-hero__copy">
          <nav className="ph__crumbs mono" data-in>
            <TLink to="/" className="link-u">Home</TLink>
            <span><i>/</i><TLink to="/products" className="link-u">Machines</TLink></span>
            <span><i>/</i><b>{p.model}</b></span>
          </nav>
          <p className="ph__kicker mono" data-in><span>{p.index} / 06</span>Model {p.model}</p>
          <SplitLines as="h1" className="pd-hero__title" immediate delay={delay}>{p.name}</SplitLines>
          <p className="pd-hero__tag" data-in>{p.tagline}</p>
          <div className="pd-hero__btns" data-in>
            <Button to="/contact">Request a Demo</Button>
            <Button href={p.catalogue} variant="ghost" target="_blank" rel="noreferrer">Download Catalogue</Button>
          </div>
          <dl className="pd-kpis" data-in>
            <div><dt className="mono">Throughput</dt><dd className="tnum">{fmt.format(p.throughput)}<small>{p.unit}</small></dd></div>
            <div><dt className="mono">HD cameras</dt><dd className="tnum">{p.cameras}</dd></div>
            <div><dt className="mono">Power</dt><dd>415<small>V · 3φ</small></dd></div>
          </dl>
        </div>
        <div className="pd__machine">
          <div className="pd__machine-bg" aria-hidden="true" />
          <img src={p.img} alt={p.name} />
          {w && (
            <>
              <div className="pd__dim pd__dim--x mono" aria-hidden="true"><span>{w} mm</span></div>
              <div className="pd__dim pd__dim--y mono" aria-hidden="true"><span>{h} mm</span></div>
            </>
          )}
          <span className="crop crop--tl" /><span className="crop crop--tr" /><span className="crop crop--bl" /><span className="crop crop--br" />
        </div>
      </div>
    </section>
  )
}

/* Process flow: the connecting rule draws itself as you scroll */
function Flow({ flow }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.flow__rule i', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 55%', scrub: true } })
      gsap.from('.flow__step', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    }, root)
    return () => ctx.revert()
  }, [flow])

  return (
    <div className="flow" ref={root}>
      <div className="flow__rule" aria-hidden="true"><i /></div>
      <ol className="flow__steps" style={{ '--n': flow.length }}>
        {flow.map((s, i) => (
          <li key={s.t} className="flow__step">
            <span className="flow__node" aria-hidden="true" />
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <strong>{s.t}</strong>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const p = productBySlug(slug)
  useTitle(p?.name ?? 'Machine not found')
  if (!p) return <NotFound />

  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3)
  const specRows = [
    ['Model', p.model],
    ['Throughput', `${fmt.format(p.throughput)} ${p.unit}`],
    ['HD cameras', p.cameras],
    ['Electrical load', p.specs.load],
    ['Power requirement', p.specs.power],
    ['Air requirement', p.specs.air],
    ['Dimensions (L × W × H)', p.dims],
    ['Net weight', p.weight],
  ]

  return (
    <div key={p.slug}>
      <Hero p={p} />

      <section className="wrap pg-sec pd-desc">
        <div>
          <Eyebrow index="01">Overview</Eyebrow>
        </div>
        <div>
          <SplitLines as="h2" className="pd-desc__lead">{p.desc[0]}</SplitLines>
          <Reveal className="pd-desc__rest" stagger={0.1}>
            {p.desc.slice(1).map((d) => <p key={d.slice(0, 20)}>{d}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="pg-sec pd-flow">
        <div className="wrap">
          <div className="sec-head">
            <Eyebrow index="02">How it works</Eyebrow>
            <SplitLines as="h2" className="h2">From hopper to <em>verdict.</em></SplitLines>
          </div>
          <Flow flow={p.flow} />
        </div>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head sec-head--row">
          <div>
            <Eyebrow index="03">What we inspect</Eyebrow>
            <SplitLines as="h2" className="h2">Defects this machine <em>catches.</em></SplitLines>
          </div>
          <p className="lede">Each defect class is checked on every part, and rejected parts are separated automatically.</p>
        </div>
        <Reveal className="defects" stagger={0.05}>
          {p.defects.map((d, i) => (
            <div key={d} className="defect">
              <span className="defect__box" aria-hidden="true"><i /></span>
              <span className="mono">D-{String(i + 1).padStart(2, '0')}</span>
              <strong>{d}</strong>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap pg-sec pd-media">
        <Reveal as="figure" className="pd-media__a">
          <img src={p.photo} alt={`${p.name} on the line`} loading="lazy" />
          <figcaption className="mono">On the line</figcaption>
        </Reveal>
        <Reveal as="figure" className="pd-media__b" delay={0.1}>
          <img src={p.hmi} alt={`${p.name} operator interface`} loading="lazy" />
          <figcaption className="mono">Operator HMI · live pass / fail</figcaption>
        </Reveal>
      </section>

      <section className="wrap pg-sec pd-sheet">
        <div>
          <Eyebrow index="04">Technical specifications</Eyebrow>
          <SplitLines as="h2" className="h2">The <em>datasheet.</em></SplitLines>
          <p className="lede" style={{ marginTop: 20 }}>Suitable for {p.industries.map((s) => INDUSTRIES.find((i) => i.slug === s).name).join(', ')} components.</p>
          <div style={{ marginTop: 28 }}>
            <Button href={p.catalogue} target="_blank" rel="noreferrer">Download Catalogue (PDF)</Button>
          </div>
        </div>
        <Reveal as="dl" className="sheet" stagger={0.04} y={16}>
          {specRows.map(([k, v]) => (
            <div key={k} className="sheet__row">
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head sec-head--row">
          <div>
            <Eyebrow index="05">Related machines</Eyebrow>
            <SplitLines as="h2" className="h2">Keep <em>exploring.</em></SplitLines>
          </div>
          <Button to="/products" variant="ghost">All machines</Button>
        </div>
        <Reveal className="mgrid mgrid--3" stagger={0.08}>
          {related.map((r) => <MachineCard key={r.slug} p={r} />)}
        </Reveal>
      </section>
    </div>
  )
}
