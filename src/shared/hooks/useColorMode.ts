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

// 전환 동안만 색상 트랜지션을 켜서 새 팔레트로 부드럽게 크로스페이드합니다
const FADE_MS = 350
let fadeTimer: number | undefined

const applyWithFade = (mode: Mode) => {
  const root = document.documentElement
  root.classList.add('mode-transition')
  applyToDocument(mode)
  window.clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(
    () => root.classList.remove('mode-transition'),
    FADE_MS,
  )
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
    const follow = () => applyWithFade(systemMode())
    query.addEventListener('change', follow)
    return () => query.removeEventListener('change', follow)
  }, [pref])

  const cycle = () => {
    const next = NEXT[pref]
    setPref(next)
    if (next === 'system') {
      localStorage.removeItem(KEY)
      applyWithFade(systemMode())
    } else {
      localStorage.setItem(KEY, next)
      applyWithFade(next)
    }
  }

  return { pref, cycle }
}
