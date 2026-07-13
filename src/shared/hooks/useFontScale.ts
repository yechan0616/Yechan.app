'use client'

import { useEffect, useState } from 'react'

const KEY = 'portfolio-font-scale'

const clamp = (value: number) =>
  Math.min(1.3, Math.max(0.85, Math.round(value * 100) / 100))

const applyZoom = (scale: number) => {
  if (scale === 1) document.documentElement.style.removeProperty('--font-scale')
  else document.documentElement.style.setProperty('--font-scale', String(scale))
}

export function useFontScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const saved = Number.parseFloat(localStorage.getItem(KEY) ?? '')
    if (saved && saved !== 1) {
      setScale(clamp(saved))
      applyZoom(clamp(saved))
    }
  }, [])

  const apply = (value: number) => {
    const next = clamp(value)
    setScale(next)
    localStorage.setItem(KEY, String(next))
    applyZoom(next)
  }

  return {
    decrease: () => apply(scale - 0.05),
    increase: () => apply(scale + 0.05),
    reset: () => apply(1),
  }
}
