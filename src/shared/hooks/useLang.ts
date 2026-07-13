'use client'

import { useEffect, useState } from 'react'
import type { Lang } from 'shared/i18n/strings'

const KEY = 'portfolio-lang'

export function useLang() {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'ko') {
      setLang(saved)
      return
    }
    // 저장된 선택이 없으면 디바이스 언어를 따릅니다
    if (navigator.language.toLowerCase().startsWith('ko')) setLang('ko')
  }, [])

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ko' : 'en'
      localStorage.setItem(KEY, next)
      return next
    })
  }

  return { lang, toggleLang }
}
