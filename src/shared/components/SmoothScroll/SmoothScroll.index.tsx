'use client'

import Lenis from 'lenis'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

let instance: Lenis | null = null

export function jumpTo(y: number) {
  if (instance) {
    instance.resize()
    instance.scrollTo(y, { immediate: true, force: true })
  } else {
    window.scrollTo(0, y)
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true })
    instance = lenis
    return () => {
      instance = null
      lenis.destroy()
    }
  }, [])

  return children
}
