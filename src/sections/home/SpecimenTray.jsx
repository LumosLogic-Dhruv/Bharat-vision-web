import { useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { INSPECTION_ITEMS, INDUSTRIES } from '../../data/site'
import { Eyebrow, SplitLines } from '../../components/Reveal'
import Specimen from '../../components/Specimen'
import Button from '../../components/Button'
import { ScrollTrigger } from '../../lib/scroll'
import useAutoHover from '../../lib/useAutoHover'

const FILTERS = [{ slug: 'all', name: 'All' }, ...INDUSTRIES]

export default function SpecimenTray() {
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)
  useAutoHover(gridRef)
  const items = INSPECTION_ITEMS.filter((it) => filter === 'all' || it.industry === filter)
  const current = INDUSTRIES.find((i) => i.slug === filter)

  return (
    <section className="tray">
      <div className="wrap">
        <div className="tray__head">
          <div>
            <Eyebrow index="04">Products we inspect</Eyebrow>
            <SplitLines as="h2" className="h2">
              Put it on the tray. <em>Hover to inspect.</em>
            </SplitLines>
          </div>
          <LayoutGroup>
            <div className="tabs" role="tablist" aria-label="Filter by industry">
              {FILTERS.map((f) => (
                <button key={f.slug} role="tab" aria-selected={filter === f.slug} className={`tab ${filter === f.slug ? 'is-active' : ''}`} onClick={() => setFilter(f.slug)}>
                  {filter === f.slug && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="tab__txt">{f.name}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout ref={gridRef} className="tray__grid" onLayoutAnimationComplete={() => ScrollTrigger.refresh()}>
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.div
                key={it.src}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Specimen name={it.name} src={it.src} index={i} industry={it.industry} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="tray__foot">
          <p className="mono muted">{items.length} components · {current ? current.name : 'all industries'}</p>
          <Button to={current ? `/${current.slug}` : '/we-inspect'} variant="ghost">
            {current ? `${current.name} inspection` : 'Industries we serve'}
          </Button>
        </div>
      </div>
    </section>
  )
}
