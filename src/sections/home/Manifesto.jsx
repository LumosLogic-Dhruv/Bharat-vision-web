import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/scroll'
import { Eyebrow } from '../../components/Reveal'
import Button from '../../components/Button'

/* Words brighten as you read; small specimens sit inline with the text */
const TEXT = [
  'At Bharat Vision Automation, we believe in the power of vision.',
  { img: '/images/inspection/2.Rubber%20stopper%20.png' },
  'Our hard work, dedication and creativity have propelled us to the forefront of India’s inspection machine market',
  { img: '/images/inspection/6.Glass%20Vials.png' },
  '— automated, computerised vision inspection machines where quality and technology converge.',
]

export default function Manifesto() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.mani__w', { opacity: 0.14 }, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.mani__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
      gsap.from('.mani__pill', {
        scale: 0,
        rotate: -30,
        ease: 'back.out(2)',
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: { trigger: '.mani__text', start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="mani" ref={root}>
      <div className="wrap mani__grid">
        <Eyebrow index="01">Welcome to Bharat Vision</Eyebrow>
        <div>
          <p className="mani__text">
            {TEXT.map((chunk, i) =>
              typeof chunk === 'string' ? (
                <Fragment key={i}>
                  {chunk.split(' ').map((w, j) => (
                    <span key={j} className="mani__w">{w} </span>
                  ))}
                </Fragment>
              ) : (
                <span key={i} className="mani__pill" aria-hidden="true">
                  <img src={chunk.img} alt="" />
                </span>
              ),
            )}
          </p>
          <div className="mani__foot">
            <p>
              We specialise in the design, manufacturing and solution of automated machine vision inspection systems — material handling, machine control and rejected-part sorting in conjunction with cameras.
            </p>
            <Button to="/about" variant="ghost">Our story</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
