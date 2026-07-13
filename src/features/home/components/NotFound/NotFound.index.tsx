'use client'

import { useLang } from 'shared/hooks/useLang'
import { strings } from 'shared/i18n/strings'
import { fadeUp } from 'shared/styles/motion'
import * as S from './NotFound.styled'

export function NotFound() {
  const { lang } = useLang()
  const t = strings[lang]

  return (
    <S.Page variants={fadeUp} initial='hidden' animate='visible'>
      <S.Code>404</S.Code>
      <S.Message>{t.notFound}</S.Message>
      <S.HomeLink href='/'>
        {t.goHome}
        <span aria-hidden='true'>→</span>
      </S.HomeLink>
    </S.Page>
  )
}
