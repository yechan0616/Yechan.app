'use client'

import type { Lang } from 'shared/i18n/strings'
import * as S from './TopBar.styled'

interface TopBarProps {
  lang: Lang
  onToggleLang: () => void
}

export function TopBar({ lang, onToggleLang }: TopBarProps) {
  return (
    <S.Container>
      <S.LangButton
        type='button'
        onClick={onToggleLang}
        aria-label='Switch language'
      >
        <S.LangOption active={lang === 'ko'}>KO</S.LangOption>
        <S.LangSlash aria-hidden='true'>/</S.LangSlash>
        <S.LangOption active={lang === 'en'}>EN</S.LangOption>
      </S.LangButton>
    </S.Container>
  )
}
