import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../lib/scroll'

/* ─────────────────────────────────────────────────────────────
   SplitLines — masked line-by-line headline reveal (SplitText).
   Reveal       — simple rise + fade for any block.
───────────────────────────────────────────────────────────── */
export function SplitLines({ as: Tag = 'h2', children, className = '', delay = 0, immediate = false, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    let split
    const ctx = gsap.context(() => {})
    const run = () =>
      ctx.add(() => {
        split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        gsap.from(split.lines, {
          yPercent: 110,
          rotate: 2,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
        })
        gsap.set(el, { autoAlpha: 1 })
      })
    gsap.set(el, { autoAlpha: 0 })
    ;(document.fonts?.ready ?? Promise.resolve()).then(run)
    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [delay, immediate])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function Reveal({ as: Tag = 'div', children, className = '', y = 40, delay = 0, stagger = 0, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    const targets = stagger ? el.children : el
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
    return () => ctx.revert()
  }, [y, delay, stagger])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/* Eyebrow label with an animated measuring tick */
export function Eyebrow({ children, index }) {
  return (
    <div className="eyebrow">
      {index && <span className="eyebrow__idx mono">{index}</span>}
      <span className="eyebrow__rule" />
      <span className="mono">{children}</span>
    </div>
  )
}
