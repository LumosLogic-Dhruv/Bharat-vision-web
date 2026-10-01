import { createContext, forwardRef, useCallback, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger, lockScroll, prefersReducedMotion, scrollToTop } from './scroll'
import { PRODUCTS, INDUSTRIES } from '../data/site'

const TransitionCtx = createContext({ go: () => {}, busy: false })

const LABELS = {
  '/': 'Home',
  '/products': 'Visual Inspection Machines',
  '/we-inspect': 'We Inspect',
  '/about': 'About',
  '/contact': 'Contact',
}

export function labelFor(path) {
  if (LABELS[path]) return LABELS[path]
  const p = PRODUCTS.find((x) => `/products/${x.slug}` === path)
  if (p) return p.model + ' — ' + p.short
  const ind = INDUSTRIES.find((x) => `/${x.slug}` === path)
  return ind ? ind.name : ''
}

export function TransitionProvider({ apertureRef, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const busy = useRef(false)

  const go = useCallback(
    (to) => {
      if (busy.current) return
      if (to === location.pathname) {
        scrollToTop(false)
        return
      }
      const ap = apertureRef.current
      if (!ap || prefersReducedMotion()) {
        navigate(to)
        scrollToTop()
        return
      }
      busy.current = true
      lockScroll(true)
      ap.close(labelFor(to)).then(() => {
        navigate(to)
        scrollToTop()
        // two frames so the new route is laid out before measuring
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
            lockScroll(false)
            ap.open().then(() => {
              busy.current = false
            })
          }),
        )
      })
    },
    [apertureRef, location.pathname, navigate],
  )

  return <TransitionCtx.Provider value={{ go }}>{children}</TransitionCtx.Provider>
}

export const useTransition = () => useContext(TransitionCtx)

/* Drop-in replacement for <Link> that plays the aperture */
export const TLink = forwardRef(function TLink({ to, onClick, children, ...rest }, ref) {
  const { go } = useTransition()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    go(to)
  }
  return (
    <a ref={ref} href={to} onClick={handle} {...rest}>
      {children}
    </a>
  )
})
