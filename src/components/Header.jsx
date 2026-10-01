import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { TLink } from '../lib/transition'
import { lockScroll } from '../lib/scroll'
import { NAV, PRODUCTS, INDUSTRIES, COMPANY } from '../data/site'
import Button from './Button'

const ease = [0.22, 1, 0.36, 1]

function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = () =>
      setT(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()))
    fmt()
    const iv = setInterval(fmt, 15000)
    return () => clearInterval(iv)
  }, [])
  return (
    <span className="hdr__clock mono">
      <span className="dot dot--pass" /> AHMEDABAD {t} IST
    </span>
  )
}

function MegaMachines({ close }) {
  return (
    <div className="mega__grid mega__grid--machines">
      {PRODUCTS.map((p, i) => (
        <motion.div key={p.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.5, ease }}>
          <TLink to={`/products/${p.slug}`} className="mega__machine" onClick={close}>
            <span className="mega__thumb">
              <img src={p.img} alt="" loading="lazy" />
            </span>
            <span className="mono mega__model">{p.model}</span>
            <span className="mega__name">{p.name}</span>
          </TLink>
        </motion.div>
      ))}
      <TLink to="/products" className="mega__all" onClick={close}>
        <span className="mono">All machines</span>
        <span className="mega__all-big">Index of 6 →</span>
      </TLink>
    </div>
  )
}

function MegaIndustries({ close }) {
  return (
    <div className="mega__grid mega__grid--ind">
      {INDUSTRIES.map((ind, i) => (
        <motion.div key={ind.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, duration: 0.5, ease }}>
          <TLink to={`/${ind.slug}`} className="mega__ind" onClick={close}>
            <span className="mega__ind-img">
              <img src={ind.hero} alt="" loading="lazy" />
            </span>
            <span className="mono">0{i + 1}</span>
            <span className="mega__ind-name">{ind.name}</span>
          </TLink>
        </motion.div>
      ))}
    </div>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    let last = window.scrollY
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240)
        last = y
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMenu(null)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    lockScroll(mobile)
  }, [mobile])

  const open = (m) => {
    clearTimeout(timer.current)
    setMenu(m)
  }
  const close = () => {
    timer.current = setTimeout(() => setMenu(null), 160)
  }

  const isActive = (item) =>
    item.to === '/'
      ? pathname === '/'
      : pathname.startsWith(item.to) ||
        (item.menu === 'industries' && INDUSTRIES.some((i) => pathname === `/${i.slug}`))

  return (
    <>
      <header className={`hdr ${hidden && !menu && !mobile ? 'is-hidden' : ''} ${scrolled || menu ? 'is-solid' : ''}`}>
        <div className="hdr__bar wrap">
          <TLink to="/" className="hdr__brand" aria-label={COMPANY.name}>
            <img src="/BVA.png" alt={COMPANY.name} />
          </TLink>

          <nav className="hdr__nav" aria-label="Primary" onMouseLeave={close}>
            {NAV.map((item) => (
              <div key={item.to} className="hdr__item" onMouseEnter={() => (item.menu ? open(item.menu) : setMenu(null))}>
                <TLink to={item.to} className={`hdr__link ${isActive(item) ? 'is-active' : ''}`} aria-haspopup={!!item.menu} aria-expanded={menu === item.menu}>
                  {item.label}
                  {item.menu && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={menu === item.menu ? 'is-up' : ''}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </TLink>
              </div>
            ))}
          </nav>

          <div className="hdr__actions">
            <Clock />
            <Button to="/contact" variant="solid">Contact Us</Button>
          </div>

          <button className={`hdr__burger ${mobile ? 'is-open' : ''}`} onClick={() => setMobile((v) => !v)} aria-label="Menu" aria-expanded={mobile}>
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              className="mega"
              onMouseEnter={() => open(menu)}
              onMouseLeave={close}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="wrap mega__inner">
                <div className="mega__side">
                  <span className="mono">{menu === 'machines' ? 'Visual Inspection Machines' : 'We Inspect'}</span>
                  <p>
                    {menu === 'machines'
                      ? 'Six fully automatic inspection & sorting machines — stainless steel, glass-cabinet, multi-camera.'
                      : 'Precision machine vision systems for quality assurance across industries.'}
                  </p>
                  <TLink to={menu === 'machines' ? '/products' : '/we-inspect'} className="link-u" onClick={() => setMenu(null)}>
                    {menu === 'machines' ? 'View all machines' : 'Overview of industries'}
                  </TLink>
                </div>
                {menu === 'machines' ? <MegaMachines close={() => setMenu(null)} /> : <MegaIndustries close={() => setMenu(null)} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="mnav"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mnav__inner wrap">
              {[
                { label: 'Home', to: '/' },
                { label: 'Machines', to: '/products', subs: PRODUCTS.map((p) => ({ label: p.name, to: `/products/${p.slug}` })) },
                { label: 'We Inspect', to: '/we-inspect', subs: INDUSTRIES.map((i) => ({ label: i.name, to: `/${i.slug}` })) },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((item, i) => (
                <motion.div key={item.to} className="mnav__row" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}>
                  <TLink to={item.to} className="mnav__link">
                    <span className="mono">0{i + 1}</span>
                    {item.label}
                  </TLink>
                  {item.subs && (
                    <div className="mnav__subs">
                      {item.subs.map((s) => (
                        <TLink key={s.to} to={s.to}>
                          {s.label}
                        </TLink>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mnav__foot mono">
                <span>{COMPANY.phones[0]}</span>
                <span>{COMPANY.emails[1]}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
