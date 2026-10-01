import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion, scrollToTop } from '../lib/scroll'
import { TLink } from '../lib/transition'
import { COMPANY, PRODUCTS, INDUSTRIES } from '../data/site'
import ShaderField from './ShaderField'
import Button from './Button'
import { SplitLines } from './Reveal'

function Cta() {
  return (
    <section className="cta">
      <ShaderField className="cta__field" />
      <div className="cta__grain" />
      <div className="wrap cta__inner">
        <span className="mono cta__kicker">Complimentary sample trial</span>
        <SplitLines as="h2" className="cta__title">
          Send us your part. <em>We'll show you</em> every defect.
        </SplitLines>
        <p className="cta__sub">
          Talk to our engineers and get a custom inspection solution designed for your production line — from a single conveyor station to a full sorting machine.
        </p>
        <div className="cta__btns">
          <Button to="/contact">Request a Demo</Button>
          <Button to="/products" variant="ghost">View Machines</Button>
        </div>
      </div>
    </section>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const markRef = useRef(null)

  /* BHARAT VISION mark animation — disabled
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ftr__mark span', {
        yPercent: 100,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: { trigger: markRef.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
      })
    }, markRef)
    return () => ctx.revert()
  }, [])
  */

  const year = new Date().getFullYear()

  return (
    <>
      {pathname !== '/contact' && <Cta />}
      <footer className="ftr">
        <div className="wrap">
          <div className="ftr__grid">
            <div className="ftr__about">
              <img src="/BVA.png" alt={COMPANY.name} className="ftr__logo" />
              <p>
                Our journey as a leading manufacturer and developer of inspection machines in India has been driven by hard work, diligence and a passion for creativity. Let's work together to shape the future of inspection technology.
              </p>
            </div>
            <div>
              <h4 className="mono">Machines</h4>
              <ul>
                {PRODUCTS.map((p) => (
                  <li key={p.slug}>
                    <TLink to={`/products/${p.slug}`} className="link-u">{p.name}</TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono">Navigate</h4>
              <ul>
                <li><TLink to="/" className="link-u">Home</TLink></li>
                <li><TLink to="/products" className="link-u">Visual Inspection Machines</TLink></li>
                <li><TLink to="/we-inspect" className="link-u">We Inspect</TLink></li>
                {INDUSTRIES.map((i) => (
                  <li key={i.slug} className="ftr__sub"><TLink to={`/${i.slug}`} className="link-u">{i.name}</TLink></li>
                ))}
                <li><TLink to="/about" className="link-u">About</TLink></li>
                <li><TLink to="/contact" className="link-u">Contact</TLink></li>
              </ul>
            </div>
            <div>
              <h4 className="mono">Reach us</h4>
              <address>
                {COMPANY.address.map((l) => <span key={l}>{l}</span>)}
              </address>
              <ul className="ftr__contact">
                {COMPANY.phones.map((p) => (
                  <li key={p}><a href={`tel:${p.replace(/\s/g, '')}`} className="link-u">{p}</a></li>
                ))}
                {COMPANY.emails.map((e) => (
                  <li key={e}><a href={`mailto:${e}`} className="link-u">{e}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BHARAT VISION big mark — hidden
        <div className="ftr__mark" ref={markRef} aria-hidden="true">
          {'BHARAT VISION'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </div>
        */}

        <div className="wrap ftr__bottom mono">
          <span>© {year} {COMPANY.name}. All rights reserved.</span>
          <span>Est. {COMPANY.since} · Ahmedabad, India</span>
          <button onClick={() => scrollToTop(false)} className="link-u">Back to top ↑</button>
        </div>
      </footer>
    </>
  )
}
