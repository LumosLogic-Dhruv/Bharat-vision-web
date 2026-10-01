import { useEffect } from 'react'

const BASE = 'Bharat Vision Automation'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Machine Vision Inspection Systems`
  }, [title])
}
