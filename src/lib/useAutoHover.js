import { useEffect } from 'react'

/* Periodically gives a random card inside `ref` the `is-auto` class so it
   plays its hover animation by itself. Pauses while the user hovers. */
export default function useAutoHover(ref, selector = '.spec', interval = 2600) {
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let last = null
    let hovering = false
    const clear = () => last && last.classList.remove('is-auto')
    const enter = () => { hovering = true; clear() }
    const leave = () => { hovering = false }
    root.addEventListener('pointerover', enter)
    root.addEventListener('pointerleave', leave)
    const id = setInterval(() => {
      if (hovering || document.hidden) return
      const cards = root.querySelectorAll(selector)
      if (!cards.length) return
      clear()
      let next
      do { next = cards[Math.floor(Math.random() * cards.length)] } while (cards.length > 1 && next === last)
      next.classList.add('is-auto')
      last = next
    }, interval)
    return () => {
      clearInterval(id)
      clear()
      root.removeEventListener('pointerover', enter)
      root.removeEventListener('pointerleave', leave)
    }
  }, [ref, selector, interval])
}
