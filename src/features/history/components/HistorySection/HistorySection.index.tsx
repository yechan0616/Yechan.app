'use client'

import { history } from 'features/history/api'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang } from 'shared/i18n/strings'
import { fade, fadeUp, stagger, viewportOnce } from 'shared/styles/motion'
import * as S from './HistorySection.styled'

export function HistorySection({ lang }: { lang: Lang }) {
  if (history.length === 0) return null

  return (
    <S.Section
      id='history'
      variants={fade}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <SectionTitle>History</SectionTitle>
      <S.List variants={stagger}>
        {history.map((item) => (
          <S.Row key={item.year} variants={fadeUp}>
            <S.Year>{item.year}</S.Year>
            <S.Events>
              {item.events.map((event) => (
                <S.Event key={event.en}>{event[lang]}</S.Event>
              ))}
            </S.Events>
          </S.Row>
        ))}
      </S.List>
    </S.Section>
  )
}
