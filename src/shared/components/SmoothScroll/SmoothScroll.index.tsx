'use client'

import Lenis from 'lenis'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true })
    return () => lenis.destroy()
  }, [])

  return children
}
