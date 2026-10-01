import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/scroll'
import { TLink } from '../../lib/transition'
import { PRODUCTS } from '../../data/site'
import { Eyebrow, SplitLines } from '../../components/Reveal'
import { Arrow } from '../../components/Button'

const fmt = new Intl.NumberFormat('en-IN')

/* ─────────────────────────────────────────────────────────────
   Machine rail — vertical scroll drives a horizontal line-up of
   the six machines. Each plate's photo counter-parallaxes and
   the throughput figure is set like a spec-sheet headline.
───────────────────────────────────────────────────────────── */
export default function MachineRail() {
  const root = useRef(null)
  const rail = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => rail.current.scrollWidth - window.innerWidth
      const tween = gsap.to(rail.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.to('.rail__bar i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + distance(), scrub: true },
      })
      root.current.querySelectorAll('.plate__img img').forEach((img) => {
        gsap.fromTo(img, { xPercent: 8 }, {
          xPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: img.closest('.plate'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="rail" ref={root}>
      <div className="rail__track" ref={rail}>
        <div className="rail__intro">
          <Eyebrow index="03">Visual inspection machines</Eyebrow>
          <SplitLines as="h2" className="h2">
            Six machines. <em>One obsession</em> with the flawless part.
          </SplitLines>
          <p className="lede">
            Stainless-steel bodies, dust-proof glass cabinets and up to six HD cameras — each machine is built in our own plants in Ahmedabad.
          </p>
          <div className="rail__bar" aria-hidden="true"><i /></div>
          <span className="mono muted rail__hint">Scroll to move along the line →</span>
        </div>

        {PRODUCTS.map((p) => (
          <TLink key={p.slug} to={`/products/${p.slug}`} className="plate" data-cursor="View">
            <div className="plate__top mono">
              <span>{p.index} / 06</span>
              <span>{p.model}</span>
            </div>
            <div className="plate__img">
              <img src={p.img} alt={p.name} loading="lazy" />
            </div>
            <div className="plate__body">
              <h3>{p.name}</h3>
              <div className="plate__specs">
                <div>
                  <strong className="tnum">{fmt.format(p.throughput)}</strong>
                  <span className="mono">{p.unit}</span>
                </div>
                <div>
                  <strong className="tnum">{p.cameras}</strong>
                  <span className="mono">HD camera{p.cameras > 1 ? 's' : ''}</span>
                </div>
              </div>
              <span className="plate__go">
                View machine <Arrow size={14} />
              </span>
            </div>
          </TLink>
        ))}

        <TLink to="/products" className="plate plate--all" data-cursor="Index">
          <span className="mono">Full index</span>
          <strong>
            Compare all <em>six</em>
          </strong>
          <Arrow size={32} />
        </TLink>
      </div>
    </section>
  )
}
