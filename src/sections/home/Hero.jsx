import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, introDelay, prefersReducedMotion } from '../../lib/scroll'
import { SplitLines } from '../../components/Reveal'
import Button from '../../components/Button'

const LensCanvas = lazy(() => import('../../components/LensCanvas'))

/* Parts inspected while you've been on the page, at 60,000 / hr */
function LiveCount() {
  const ref = useRef(null)
  useEffect(() => {
    const t0 = performance.now()
    const fmt = new Intl.NumberFormat('en-IN')
    const iv = setInterval(() => {
      if (ref.current) ref.current.textContent = fmt.format(Math.floor(((performance.now() - t0) / 1000) * (60000 / 3600)))
    }, 90)
    return () => clearInterval(iv)
  }, [])
  return <span ref={ref} className="tnum">0</span>
}

/* ─────────────────────────────────────────────────────────────
   Loupe — a magnifier follows the pointer over the headline and
   reveals the "inspection view": the same words in blueprint,
   with flagged defects only the camera can see.
───────────────────────────────────────────────────────────── */
function Loupe({ children }) {
  const wrap = useRef(null)
  const lens = useRef(null)
  const inner = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!window.matchMedia('(pointer: fine)').matches) return
    const R = 96
    const state = { x: 0, y: 0, r: 0 }
    const render = () => {
      lens.current.style.clipPath = `circle(${state.r}px at ${state.x}px ${state.y}px)`
      inner.current.style.transformOrigin = `${state.x}px ${state.y}px`
      ring.current.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.r / R})`
    }
    const move = (e) => {
      const r = el.getBoundingClientRect()
      gsap.to(state, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.25, ease: 'power3.out', onUpdate: render })
    }
    const enter = () => gsap.to(state, { r: R, duration: 0.5, ease: 'back.out(1.6)', onUpdate: render })
    const leave = () => gsap.to(state, { r: 0, duration: 0.35, ease: 'power3.in', onUpdate: render })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="loupe-wrap" ref={wrap} data-cursor-hide>
      {children}
      <div className="loupe" ref={lens} aria-hidden="true">
        <div className="loupe__inner" ref={inner}>
          <div className="hero__title hero__title--xray">
            <span className="hero__line">Every defect,</span>
            <span className="hero__line"><em>seen.</em></span>
          </div>
          <span className="flaw" style={{ left: '14%', top: '22%' }}><i />BURR · 0.02mm</span>
          <span className="flaw" style={{ left: '63%', top: '30%' }}><i />BLACK SPOT</span>
          <span className="flaw flaw--pass" style={{ left: '30%', top: '74%' }}><i />PASS · 99.8</span>
        </div>
      </div>
      <div className="loupe__ring" ref={ring} aria-hidden="true">
        <span className="mono">1.6×</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const root = useRef(null)
  const scrollP = useRef(0)
  const [delay] = useState(() => introDelay())

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero [data-in]', { y: 28, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: delay + 0.35 })
      gsap.from('.hero__stage', { clipPath: 'inset(12% 12% 12% 12% round 28px)', autoAlpha: 0, duration: 1.4, ease: 'expo.out', delay: delay - 0.1 })
      gsap.from('.hero__dim', { scaleX: 0, duration: 1.2, ease: 'expo.out', delay: delay + 0.5, stagger: 0.1 })
      gsap.to(scrollP, {
        current: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__stage', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [delay])

  return (
    <section className="hero" ref={root}>
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow mono" data-in>
            <span className="dot dot--pass" /> Automated Vision Inspection Systems — Est. 1975
          </div>

          <Loupe>
            <SplitLines as="h1" className="hero__title" immediate delay={delay}>
              <span className="hero__line">Every defect,</span>
              <span className="hero__line"><em>seen.</em></span>
            </SplitLines>
          </Loupe>

          <p className="hero__lede" data-in>
            Bharat Vision Automation designs and builds fully automatic machine-vision inspection &amp; sorting machines for pharmaceutical, cosmetics and automobile components — so only perfect parts leave your line.
          </p>

          <div className="hero__ctas" data-in>
            <Button to="/products">Explore Machines</Button>
            <Button to="/contact" variant="ghost">Get a Quote</Button>
          </div>

          <div className="hero__meter" data-in>
            <div>
              <span className="mono">Parts inspected since you arrived*</span>
              <strong><LiveCount /></strong>
            </div>
            <div>
              <span className="mono">Peak throughput</span>
              <strong>60,000<small>/hr</small></strong>
            </div>
            <div>
              <span className="mono">Cameras per machine</span>
              <strong>up to 6</strong>
            </div>
          </div>
        </div>

        <div className="hero__stage">
          <div className="hero__stage-grid" aria-hidden="true" />
          <span className="crop crop--tl" /><span className="crop crop--tr" /><span className="crop crop--bl" /><span className="crop crop--br" />
          <div className="hero__tag hero__tag--tl mono">
            <span>Optical unit</span>
            <span className="muted">HD · mono · strobe-synced</span>
          </div>
          <div className="hero__tag hero__tag--br mono">
            <span className="dot dot--pass" /> Detection active
          </div>
          <div className="hero__dim hero__dim--x mono" aria-hidden="true"><span>1000 ppm</span></div>
          <div className="hero__dim hero__dim--y mono" aria-hidden="true"><span>6 cam</span></div>
          <Suspense fallback={<div className="lens-canvas lens-canvas--loading mono">Loading optics…</div>}>
            <LensCanvas scrollRef={scrollP} />
          </Suspense>
        </div>
      </div>
      <p className="wrap hero__foot mono">* Estimated at one machine's peak rate of 60,000 parts per hour.</p>
    </section>
  )
}
