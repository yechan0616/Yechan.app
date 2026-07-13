'use client'

import { MonitorIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useColorMode } from 'shared/hooks/useColorMode'
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
  const [tipOpen, setTipOpen] = useState(false)
  const { pref, cycle } = useColorMode()

  useEffect(() => {
    setUpdated({ label: relativeLabel(lang), exact: exactLabel() })
  }, [lang])

  // 터치 환경에는 호버가 없으니 탭으로 툴팁을 토글합니다
  const toggleTip = () => {
    if (window.matchMedia('(hover: none)').matches) setTipOpen((open) => !open)
  }

  return (
    <S.Footer>
      <S.Column>
        <S.EmailLink href={`mailto:${EMAIL}`}>{EMAIL}</S.EmailLink>
        <S.Copy>
          © {buildDate.getFullYear()} Yechan Moon ·{' '}
          <S.Updated
            data-tooltip={updated.exact}
            data-open={tipOpen || undefined}
            onClick={toggleTip}
          >
            {t.updated} {updated.label}
          </S.Updated>
        </S.Copy>
      </S.Column>
      <S.ModeButton
        type='button'
        onClick={cycle}
        aria-label={`Color mode: ${pref}`}
        title={pref}
      >
        {pref === 'system' && <MonitorIcon size={15} aria-hidden='true' />}
        {pref === 'light' && <SunIcon size={15} aria-hidden='true' />}
        {pref === 'dark' && <MoonIcon size={15} aria-hidden='true' />}
      </S.ModeButton>
    </S.Footer>
  )
}
