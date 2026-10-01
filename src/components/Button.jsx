import { TLink } from '../lib/transition'
import Magnetic from './Magnetic'

export const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* Pill button: label rolls up on hover, arrow chip slides through */
export default function Button({ to, href, children, variant = 'solid', icon = true, ...rest }) {
  const inner = (
    <>
      <span className="btn__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="btn__chip">
          <Arrow size={14} />
          <Arrow size={14} />
        </span>
      )}
    </>
  )
  const cls = `btn btn--${variant}`
  return (
    <Magnetic strength={0.25}>
      {to ? (
        <TLink to={to} className={cls} {...rest}>
          {inner}
        </TLink>
      ) : (
        <a href={href} className={cls} {...rest}>
          {inner}
        </a>
      )}
    </Magnetic>
  )
}
