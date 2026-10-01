import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/scroll'
import { PROCESS } from '../../data/site'
import { Eyebrow } from '../../components/Reveal'

/* A rubber stopper, top view — drawn so it stays crisp at any size */
function Stopper({ defect }) {
  return (
    <svg viewBox="0 0 100 100" className="stopper">
      <defs>
        <radialGradient id="st-body" cx="42%" cy="38%" r="70%">
          <stop offset="0" stopColor="#A9AFB6" />
          <stop offset="0.7" stopColor="#7C838B" />
          <stop offset="1" stopColor="#5E646B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#st-body)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#4F555C" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="13" fill="none" stroke="#5B6168" strokeWidth="3" />
      {[45, 135, 225, 315].map((a) => (
        <line key={a} x1="50" y1="22" x2="50" y2="31" stroke="#5B6168" strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 50 50)`} />
      ))}
      {defect && (
        <g className="stopper__flaws">
          <circle cx="68" cy="34" r="4.2" fill="#1F2226" />
          <path d="M24 60 q6 3 10 10" stroke="#EDEFF1" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

const N = 7
const D = 3 // the part we follow

export default function InspectionLine() {
  const root = useRef(null)
  const [step, setStep] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add({ small: '(max-width: 760px)', large: '(min-width: 761px)', reduce: '(prefers-reduced-motion: reduce)' }, (c) => {
      const { small, reduce } = c.conditions
      const sp = small ? 26 : 14 // spacing between parts (vw)
      const pw = small ? 18 : 9 // part width (vw)
      const eject = small ? 78 : 76 // nozzle x (vw)
      const el = root.current
      el.style.setProperty('--sp', sp)
      el.style.setProperty('--pw', pw)
      el.style.setProperty('--eject', eject)

      const txAt = (x, i) => x - i * sp - pw / 2 // track offset that puts part i's centre at x
      const tx0 = -(6 * sp + pw) - 4
      const txCam = txAt(50, D)
      const txEject = txAt(eject, D)

      gsap.set(el, { '--tx': reduce ? txCam : tx0 })
      if (reduce) {
        setStep(3)
        return
      }

      const bounds = [0, 2, 4, 5.5, 6.5, 8.5, 10]
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 4.5,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const t = self.progress * 10
            const s = bounds.findIndex((b, i) => t >= b && t < (bounds[i + 1] ?? 11))
            setStep(Math.max(0, Math.min(5, s)))
          },
        },
      })

      const q = gsap.utils.selector(el)
      const target = q('.part')[D]

      /* 01 · capture — parts glide in; the strobe fires on each */
      tl.to(el, { '--tx': txCam, duration: 2, ease: 'power1.inOut' }, 0)
      for (let i = N - 1; i >= D; i--) {
        const tx = txAt(50, i)
        const at = gsap.utils.clamp(0, 2, ((tx - tx0) / (txCam - tx0)) * 2)
        tl.fromTo(q('.cam__flash'), { opacity: 0 }, { opacity: 1, duration: 0.06, yoyo: true, repeat: 1 }, at - 0.06)
        tl.fromTo(q('.part')[i].querySelector('.part__frame'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.1 }, at - 0.08)
        if (i !== D) tl.to(q('.part')[i].querySelector('.part__frame'), { opacity: 0, duration: 0.15 }, at + 0.15)
      }

      /* 02 · processing — scan sweep + timing chip */
      tl.to(q('.cam__cone'), { opacity: 0.55, duration: 0.3 }, 2)
      tl.fromTo(target.querySelector('.part__grid'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.1)
      tl.fromTo(target.querySelector('.part__scan'), { yPercent: -60 }, { yPercent: 160, duration: 0.6, repeat: 2, ease: 'power1.inOut' }, 2.2)
      tl.fromTo(q('.cam__chip'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 2.2)
      tl.fromTo(q('.cam__ms'), { textContent: 0 }, { textContent: 0.84, duration: 1.4, snap: { textContent: 0.01 } }, 2.3)

      /* 03 · detection — boxes lock onto the flaws */
      tl.to(target.querySelector('.part__grid'), { opacity: 0, duration: 0.3 }, 4)
      tl.fromTo(target.querySelectorAll('.flawbox'), { autoAlpha: 0, scale: 2.2 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.25, ease: 'back.out(2)' }, 4.1)

      /* 04 · classification — verdicts for every part */
      tl.to(q('.cam__cone'), { opacity: 0.12, duration: 0.3 }, 5.5)
      tl.to(q('.cam__chip'), { autoAlpha: 0, duration: 0.3 }, 5.5)
      tl.fromTo(q('.part__tag'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 }, 5.6)
      tl.to(target.querySelector('.part__frame'), { borderColor: 'var(--reject)', duration: 0.2 }, 5.6)

      /* 05 · ejection — travel to the nozzle, one burst of air */
      tl.to(el, { '--tx': txEject, duration: 1.3, ease: 'power1.inOut' }, 6.5)
      tl.to(q('.part__tag, .flawbox'), { autoAlpha: 0, duration: 0.2 }, 6.5)
      tl.to(target.querySelector('.part__frame'), { opacity: 0, duration: 0.2 }, 6.5)
      tl.fromTo(q('.nozzle__puff'), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1.4, duration: 0.25, yoyo: true, repeat: 1 }, 7.8)
      tl.to(el, { '--tx': txEject + 20, duration: 1.2 }, 7.9)
      tl.to(target, { '--dx': -20, '--dy': 1, '--rot': 160, duration: 1.2, ease: 'power2.in' }, 7.9)
      tl.to(target, { opacity: 0, duration: 0.3 }, 8.8)
      tl.fromTo(q('.bin__count'), { textContent: 0 }, { textContent: 1, duration: 0.01 }, 9)

      /* 06 · report */
      tl.fromTo(q('.report'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 8.6)
      tl.fromTo(q('.report [data-n]'), { textContent: 0 }, { textContent: (i, t) => t.dataset.n, duration: 1, snap: { textContent: 1 }, stagger: 0.05 }, 8.7)
      tl.to({}, { duration: 0.3 }, 9.7)
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="line" ref={root}>
      <div className="wrap line__head">
        <div>
          <Eyebrow index="02">How inspection works</Eyebrow>
          <h2 className="h2">
            Follow one stopper <em>through the machine.</em>
          </h2>
        </div>
        <ol className="line__steps">
          {PROCESS.map((p, i) => (
            <li key={p.n} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
              <span className="mono">{p.n}</span>
              <div>
                <strong>{p.t}</strong>
                <p>{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="line__stage">
        <div className="cam" aria-hidden="true">
          <div className="cam__mount" />
          <div className="cam__body">
            <span className="mono">CAM 01</span>
            <div className="cam__lens" />
          </div>
          <div className="cam__cone" />
          <div className="cam__flash" />
          <div className="cam__chip mono">
            <span className="dot dot--blue" /> processing <b className="cam__ms tnum">0</b> ms
          </div>
        </div>

        <div className="nozzle" aria-hidden="true">
          <span className="mono">AIR NOZZLE</span>
          <div className="nozzle__body" />
          <div className="nozzle__puff" />
        </div>

        <div className="belt" aria-hidden="true">
          <div className="belt__surface" />
          <div className="track">
            {Array.from({ length: N }, (_, i) => (
              <div key={i} className={`part ${i === D ? 'part--target' : ''}`} style={{ '--i': i }}>
                <div className="part__frame" />
                <Stopper defect={i === D} />
                {i === D && (
                  <>
                    <div className="part__grid"><div className="part__scan" /></div>
                    <span className="flawbox" style={{ left: '60%', top: '24%' }}><em className="mono">BLACK SPOT</em></span>
                    <span className="flawbox flawbox--b" style={{ left: '18%', top: '54%' }}><em className="mono">CUT</em></span>
                  </>
                )}
                <span className={`part__tag mono ${i === D ? 'is-reject' : ''}`}>{i === D ? 'REJECT' : 'PASS'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bin" aria-hidden="true">
          <span className="mono">Reject bin · <b className="bin__count">0</b></span>
        </div>

        <div className="report">
          <div className="report__head mono">
            <span>Batch report</span>
            <span className="dot dot--pass" />
          </div>
          <dl>
            <div><dt className="mono">Inspected</dt><dd data-n="7">0</dd></div>
            <div><dt className="mono">Pass</dt><dd data-n="6" className="is-pass">0</dd></div>
            <div><dt className="mono">Reject</dt><dd data-n="1" className="is-reject">0</dd></div>
          </dl>
          <p className="mono">Defects: black spot, cut · Station 01</p>
        </div>
      </div>

      <div className="line__progress" aria-hidden="true">
        {PROCESS.map((p, i) => (
          <span key={p.n} className={i <= step ? 'is-on' : ''} />
        ))}
      </div>
    </section>
  )
}
