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

  const cycle = () => {
    const next = NEXT[pref]
    setPref(next)
    if (next === 'system') {
      localStorage.removeItem(KEY)
      applyToDocument(systemMode())
    } else {
      localStorage.setItem(KEY, next)
      applyToDocument(next)
    }
  }

  return { pref, cycle }
}
