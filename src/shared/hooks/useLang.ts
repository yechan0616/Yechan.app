'use client'

import { useEffect, useState } from 'react'
import type { Lang } from 'shared/i18n/strings'

const KEY = 'portfolio-lang'

export function useLang() {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'ko') setLang(saved)
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
