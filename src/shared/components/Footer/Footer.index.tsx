'use client'

import { useEffect, useState } from 'react'
import type { Lang, Strings } from 'shared/i18n/strings'
import * as S from './Footer.styled'

const EMAIL = 'yechan0616@icloud.com'
const DAY = 86400000

const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now())

const relativeLabel = (lang: Lang) => {
  const days = Math.floor((Date.now() - buildDate.getTime()) / DAY)
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  if (days < 1) return rtf.format(0, 'day')
  if (days < 30) return rtf.format(-days, 'day')
  if (days < 365) return rtf.format(-Math.floor(days / 30), 'month')
  return rtf.format(-Math.floor(days / 365), 'year')
}

const exactLabel = () => {
  const pad = (n: number) => String(n).padStart(2, '0')
  const offset = -buildDate.getTimezoneOffset() / 60
  const sign = offset >= 0 ? '+' : ''
  const date = `${buildDate.getFullYear()}. ${pad(buildDate.getMonth() + 1)}. ${pad(buildDate.getDate())}`
  const time = `${pad(buildDate.getHours())}:${pad(buildDate.getMinutes())}`
  return `${date} ${time} (GMT${sign}${offset})`
}

interface FooterProps {
  lang: Lang
  t: Strings
}

export function Footer({ lang, t }: FooterProps) {
  const [updated, setUpdated] = useState({ label: '', exact: '' })

  useEffect(() => {
    setUpdated({ label: relativeLabel(lang), exact: exactLabel() })
  }, [lang])

  return (
    <S.Footer>
      <S.Copy>
        © {buildDate.getFullYear()} Yechan Moon ·{' '}
        <S.Updated data-tooltip={updated.exact}>
          {t.updated} {updated.label}
        </S.Updated>
      </S.Copy>
      <S.EmailLink href={`mailto:${EMAIL}`}>{EMAIL}</S.EmailLink>
    </S.Footer>
  )
}
