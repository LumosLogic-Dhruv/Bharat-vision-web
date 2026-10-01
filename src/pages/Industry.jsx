import { useTitle } from '../lib/useTitle'
import { INDUSTRIES, PRODUCTS, industryBySlug } from '../data/site'
import PageHero from '../components/PageHero'
import Specimen from '../components/Specimen'
import MachineCard from '../components/MachineCard'
import { Eyebrow, Reveal, SplitLines } from '../components/Reveal'
import Button from '../components/Button'
import { TLink } from '../lib/transition'
import { Arrow } from '../components/Button'

/* One template drives Pharmaceutical, Cosmetics and Automobile */
export default function Industry({ slug }) {
  const ind = industryBySlug(slug)
  useTitle(`${ind.name} Inspection`)
  const machines = PRODUCTS.filter((p) => p.industries.includes(slug))
  const idx = INDUSTRIES.findIndex((i) => i.slug === slug)
  const next = INDUSTRIES[(idx + 1) % INDUSTRIES.length]

  return (
    <div key={slug}>
      <PageHero
        crumbs={[{ label: 'We Inspect', to: '/we-inspect' }, { label: ind.name }]}
        kicker={ind.kicker}
        index={`0${idx + 1} / 03`}
        title={<>{ind.title} <em>inspection</em></>}
        lede={ind.summary}
        image={ind.hero}
      />

      <section className="wrap pg-sec ind-over">
        <Eyebrow index="01">Overview</Eyebrow>
        <div>
          <SplitLines as="p" className="ind-over__lead">{ind.overview[0]}</SplitLines>
          <Reveal as="p" className="ind-over__p">{ind.overview[1]}</Reveal>
          <div className="ind-over__btns">
            <Button to="/contact">Request a Demo</Button>
            <Button to="/products" variant="ghost">View Machines</Button>
          </div>
        </div>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="02">Capabilities</Eyebrow>
          <SplitLines as="h2" className="h2">{ind.capsTitle}</SplitLines>
        </div>
        <Reveal className="caps" stagger={0.07}>
          {ind.caps.map((c, i) => (
            <div key={c.t} className="cap">
              <span className="cap__n mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head sec-head--row">
          <div>
            <Eyebrow index="03">{ind.name} products</Eyebrow>
            <SplitLines as="h2" className="h2">Components <em>on the tray.</em></SplitLines>
          </div>
          <p className="lede">Hover any component to watch the camera lock on.</p>
        </div>
        <Reveal className="tray__grid" stagger={0.05} y={24}>
          {ind.components.map((c, i) => <Specimen key={c.src} name={c.name} src={c.src} index={i} />)}
        </Reveal>
      </section>

      <section className="wrap pg-sec">
        <div className="sec-head">
          <Eyebrow index="04">Machines for {ind.name.toLowerCase()}</Eyebrow>
          <SplitLines as="h2" className="h2">Recommended <em>machines.</em></SplitLines>
        </div>
        <Reveal className="mgrid mgrid--3" stagger={0.08}>
          {machines.map((m) => <MachineCard key={m.slug} p={m} />)}
        </Reveal>
      </section>

      <section className="wrap pg-sec pg-sec--tight">
        <TLink to={`/${next.slug}`} className="next" data-cursor="Next">
          <span className="mono">Next industry</span>
          <strong>{next.name} <Arrow size={40} /></strong>
          <img src={next.hero} alt="" loading="lazy" />
        </TLink>
      </section>
    </div>
  )
}
