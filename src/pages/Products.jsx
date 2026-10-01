import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { TLink } from '../lib/transition'
import { useTitle } from '../lib/useTitle'
import { PRODUCTS, INDUSTRIES } from '../data/site'
import PageHero from '../components/PageHero'
import MachineCard from '../components/MachineCard'
import { Eyebrow, Reveal, SplitLines } from '../components/Reveal'
import { Arrow } from '../components/Button'

const fmt = new Intl.NumberFormat('en-IN')
const indName = (s) => INDUSTRIES.find((i) => i.slug === s)?.name

/* ─────────────────────────────────────────────────────────────
   Machine index — a spec-sheet table. A floating preview of the
   machine trails the pointer as you move down the rows.
───────────────────────────────────────────────────────────── */
function MachineIndex() {
  const listRef = useRef(null)
  const floatRef = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const el = floatRef.current
    if (!window.matchMedia('(pointer: fine)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div className="idx" ref={listRef} onMouseLeave={() => setActive(-1)}>
      <div className="idx__head mono">
        <span>No.</span><span>Machine</span><span>Model</span><span>Throughput</span><span>Cameras</span><span>Industries</span><span />
      </div>
      {PRODUCTS.map((p, i) => (
        <TLink key={p.slug} to={`/products/${p.slug}`} className={`idx__row ${active === i ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)} data-cursor-hide>
          <span className="mono idx__n">{p.index}</span>
          <strong className="idx__name">{p.name}</strong>
          <span className="mono idx__model">{p.model}</span>
          <span className="idx__tp tnum">{fmt.format(p.throughput)}<small> /hr</small></span>
          <span className="idx__cam tnum">{p.cameras}</span>
          <span className="idx__ind">
            {p.industries.map((s) => <i key={s}>{indName(s)}</i>)}
          </span>
          <span className="idx__go"><Arrow /></span>
        </TLink>
      ))}
      <div className={`idx__float ${active >= 0 ? 'is-on' : ''}`} ref={floatRef} aria-hidden="true">
        <div className="idx__float-inner" style={{ transform: `translateY(${(-Math.max(active, 0) * 100) / PRODUCTS.length}%)` }}>
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="idx__float-item">
              <img src={p.img} alt="" />
            </div>
          ))}
        </div>
        <span className="mono idx__float-tag">{active >= 0 ? PRODUCTS[active].model : ''}</span>
      </div>
    </div>
  )
}

const PILLARS = [
  { t: 'Stainless & glass', d: 'Every body is stainless steel; the upper portion is enclosed in a glass cabinet that keeps dust out of the inspection zone.' },
  { t: 'Multi-camera HD vision', d: 'Up to six high-definition cameras per machine inspect the front, bottom and side edges of each part.' },
  { t: 'Built in our own plants', d: 'Three dedicated plants in Ahmedabad fabricate machinery and spares in-house — so we can tailor, scale and support.' },
]

export default function Products() {
  useTitle('Visual Inspection Machines')
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Visual Inspection Machines' }]}
        kicker="Advanced machine vision inspection systems"
        index="06 machines"
        title={<>Visual inspection <em>machines</em></>}
        lede="Explore our automated vision inspection and sorting machines — designed for industrial quality control of rubber, plastic and glass components."
      />

      <section className="wrap pg-sec">
        <MachineIndex />
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="02">The line-up</Eyebrow>
          <SplitLines as="h2" className="h2">Pick your <em>part.</em> We'll match the machine.</SplitLines>
        </div>
        <Reveal className="mgrid" stagger={0.08}>
          {PRODUCTS.map((p) => <MachineCard key={p.slug} p={p} />)}
        </Reveal>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="03">Every machine, by design</Eyebrow>
          <SplitLines as="h2" className="h2">Built for <em>zero defects.</em></SplitLines>
        </div>
        <Reveal className="pillars" stagger={0.1}>
          {PILLARS.map((x, i) => (
            <div key={x.t} className="pillar">
              <span className="mono">0{i + 1}</span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  )
}
