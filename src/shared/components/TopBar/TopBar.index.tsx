'use client'

import { useFontScale } from 'shared/hooks/useFontScale'
import type { Lang } from 'shared/i18n/strings'
import * as S from './TopBar.styled'

interface TopBarProps {
  lang: Lang
  onToggleLang: () => void
}

export function TopBar({ lang, onToggleLang }: TopBarProps) {
  const { decrease, reset, increase } = useFontScale()

  return (
    <S.Container>
      <S.FontControls aria-label='Font size'>
        <S.IconButton
          type='button'
          onClick={decrease}
          aria-label='Decrease font size'
        >
          −
        </S.IconButton>
        <S.IconButton
          type='button'
          onClick={reset}
          aria-label='Reset font size'
        >
          A
        </S.IconButton>
        <S.IconButton
          type='button'
          onClick={increase}
          aria-label='Increase font size'
        >
          +
        </S.IconButton>
      </S.FontControls>
      <S.Divider aria-hidden='true' />
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
