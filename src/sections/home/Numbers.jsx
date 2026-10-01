import { STATS } from '../../data/site'
import Odometer from '../../components/Odometer'
import { Eyebrow, Reveal } from '../../components/Reveal'

export default function Numbers() {
  return (
    <section className="nums">
      <div className="wrap">
        <div className="nums__head">
          <Eyebrow index="05">Our story in numbers</Eyebrow>
          <p className="lede">Delivering excellence through innovation and dedication — since 1975.</p>
        </div>
        <Reveal className="nums__row" stagger={0.1}>
          {STATS.map((s) => (
            <div key={s.label} className="nums__cell">
              <div className="nums__val"><Odometer value={s.value} suffix={s.suffix} /></div>
              <span className="nums__tick" aria-hidden="true" />
              <p className="mono">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
