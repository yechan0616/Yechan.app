'use client'

import { useEffect, useState } from 'react'

const KEY = 'portfolio-color-mode'

type Mode = 'light' | 'dark'
export type ColorPref = Mode | 'system'

// 순환 순서: 시스템 → 라이트 → 다크 → 시스템
const NEXT: Record<ColorPref, ColorPref> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
}

const systemMode = (): Mode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyToDocument = (mode: Mode) => {
  document.documentElement.dataset.mode = mode
  document.documentElement.style.colorScheme = mode
}

// 토글 지점에서 새 테마가 원형으로 번져 나가는 전환 — View Transitions 미지원이면 즉시 적용
const applyWithReveal = (mode: Mode, origin?: { x: number; y: number }) => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  if (
    !document.startViewTransition ||
    reduceMotion ||
    !origin ||
    document.documentElement.dataset.mode === mode
  ) {
    applyToDocument(mode)
    return
  }
  const transition = document.startViewTransition(() => applyToDocument(mode))
  transition.ready
    .then(() => {
      const { x, y } = origin
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    // 연속 클릭이나 백그라운드 탭에서는 전환이 중단될 수 있어요 — 모드는 이미 적용된 뒤라 무시합니다
    .catch(() => {})
}

export function useColorMode() {
  const [pref, setPref] = useState<ColorPref>('system')

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') setPref(saved)
  }, [])

  // 시스템 모드일 때는 OS 설정 변화를 계속 따라갑니다
  useEffect(() => {
    if (pref !== 'system') return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = () => applyToDocument(systemMode())
    query.addEventListener('change', follow)
    return () => query.removeEventListener('change', follow)
  }, [pref])

  // 클릭한 요소의 중심을 원형 전환의 시작점으로 씁니다
  const cycle = (event?: { currentTarget: Element }) => {
    const next = NEXT[pref]
    setPref(next)
    let origin: { x: number; y: number } | undefined
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }
    if (next === 'system') {
      localStorage.removeItem(KEY)
      applyWithReveal(systemMode(), origin)
    } else {
      localStorage.setItem(KEY, next)
      applyWithReveal(next, origin)
    }
  }

  return { pref, cycle }
}
