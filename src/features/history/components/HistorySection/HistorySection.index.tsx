'use client'

import { history } from 'features/history/api'
import { projects } from 'features/projects/api'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang } from 'shared/i18n/strings'
import { fade, fadeUp, stagger, viewportOnce } from 'shared/styles/motion'
import * as S from './HistorySection.styled'

const projectIds = new Set(projects.map((project) => project.id))

interface HistorySectionProps {
  lang: Lang
  onSelect: (id: string) => void
}

export function HistorySection({ lang, onSelect }: HistorySectionProps) {
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
              {item.events.map((event) => {
                const linked = event.project && projectIds.has(event.project)
                const body = (
                  <>
                    {event.label[lang]}
                    {(linked || event.href) && (
                      <S.Arrow aria-hidden='true'>→</S.Arrow>
                    )}
                    {event.desc && (
                      <S.EventDesc>{event.desc[lang]}</S.EventDesc>
                    )}
                  </>
                )
                if (linked) {
                  return (
                    <S.EventButton
                      key={event.label.en}
                      type='button'
                      onClick={() => onSelect(event.project as string)}
                    >
                      {body}
                    </S.EventButton>
                  )
                }
                if (event.href) {
                  return (
                    <S.EventLink
                      key={event.label.en}
                      href={event.href}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {body}
                    </S.EventLink>
                  )
                }
                return <S.Event key={event.label.en}>{body}</S.Event>
              })}
            </S.Events>
          </S.Row>
        ))}
      </S.List>
    </S.Section>
  )
}
