import { useTitle } from '../lib/useTitle'
import Button from '../components/Button'

export default function NotFound() {
  useTitle('Not found')
  return (
    <section className="nf wrap">
      <span className="mono">Error 404 · Part not found</span>
      <h1 className="nf__title">
        Out of <em>focus.</em>
      </h1>
      <p className="lede">This page isn't on the line. It may have moved, or the address has a defect.</p>
      <div className="nf__btns">
        <Button to="/">Back home</Button>
        <Button to="/products" variant="ghost">View machines</Button>
      </div>
    </section>
  )
}
