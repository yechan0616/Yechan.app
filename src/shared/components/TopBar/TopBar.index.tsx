'use client'

import { useFontScale } from 'shared/hooks/useFontScale'
import * as S from './TopBar.styled'

interface TopBarProps {
  langLabel: string
  onToggleLang: () => void
}

export function TopBar({ langLabel, onToggleLang }: TopBarProps) {
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
      <S.LangButton type='button' onClick={onToggleLang}>
        {langLabel}
      </S.LangButton>
    </S.Container>
  )
}
