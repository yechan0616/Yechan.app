'use client'

import { useRef, useState } from 'react'
import { TextLink } from 'shared/components/TextLink/TextLink.index'
import type { Strings } from 'shared/i18n/strings'
import { asset } from 'shared/utils/asset'
import * as S from './Hero.styled'

const EMAIL = 'yechan0616@icloud.com'

export function Hero({ t }: { t: Strings }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <S.Section>
      <S.Profile>
        <S.Avatar>
          <S.AvatarImage
            src={asset('/assets/profile.jpeg')}
            alt='Yechan Moon'
          />
        </S.Avatar>
        <hgroup>
          <S.Name>Yechan Moon</S.Name>
          <S.Role>{t.role}</S.Role>
        </hgroup>
      </S.Profile>

      <S.Bio>{t.bio}</S.Bio>

      {t.now && (
        <S.Now>
          <S.NowDot aria-hidden='true' />
          {t.now}
        </S.Now>
      )}

      <S.Links>
        <TextLink href='https://github.com/yechan0616'>GitHub</TextLink>
        <TextLink href='https://www.instagram.com/yechan0616'>
          Instagram
        </TextLink>
        <S.EmailButton type='button' onClick={copyEmail} title={EMAIL}>
          {copied ? t.copied : t.email}
        </S.EmailButton>
      </S.Links>
    </S.Section>
  )
}
