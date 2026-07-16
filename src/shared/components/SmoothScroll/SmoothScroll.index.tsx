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

// 오버레이(라이트박스 등)가 열린 동안 페이지 스크롤을 잠급니다
// 루트에 overflow:hidden을 걸면 브라우저가 스크롤 오프셋을 0으로 클램프하므로,
// body를 고정하고 보이던 위치만큼 끌어올렸다가 해제할 때 원위치로 복원합니다
let lockedY = 0
let locks = 0

export function lockScroll() {
  instance?.stop()
  // 이전 오버레이가 닫히는 중에 새로 열려도 원래 위치를 덮어쓰지 않게 중첩을 셉니다
  if (locks++ > 0) return
  lockedY = window.scrollY
  const { style } = document.body
  style.position = 'fixed'
  style.top = `-${lockedY}px`
  style.left = '0'
  style.right = '0'
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks > 0) return
  const { style } = document.body
  style.position = ''
  style.top = ''
  style.left = ''
  style.right = ''
  instance?.start()
  jumpTo(lockedY)
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
