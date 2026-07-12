'use client'

import type { ReactNode } from 'react'
import * as S from './TextLink.styled'

interface TextLinkProps {
  href: string
  children: ReactNode
}

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <S.Link href={href} target='_blank' rel='noreferrer'>
      {children}
      <span aria-hidden='true'>↗</span>
    </S.Link>
  )
}
