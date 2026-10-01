import { TLink } from '../lib/transition'
import { Arrow } from './Button'

const fmt = new Intl.NumberFormat('en-IN')

export default function MachineCard({ p, note }) {
  return (
    <TLink to={`/products/${p.slug}`} className="mcard" data-cursor="View">
      <div className="mcard__top mono">
        <span>{p.model}</span>
        <span>{p.cameras} cam</span>
      </div>
      <div className="mcard__img">
        <img src={p.img} alt={p.name} loading="lazy" />
      </div>
      <div className="mcard__body">
        <h3>{p.name}</h3>
        <p>{note || p.tagline}</p>
        <div className="mcard__foot">
          <span className="mono"><b className="tnum">{fmt.format(p.throughput)}</b> {p.unit}</span>
          <span className="mcard__arrow"><Arrow size={16} /></span>
        </div>
      </div>
    </TLink>
  )
}
