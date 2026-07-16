'use client'

import {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  CertificateIcon,
} from '@phosphor-icons/react'
import { history } from 'features/history/api'
import { projects } from 'features/projects/api'
import { useState } from 'react'
import {
  AwardLightbox,
  type AwardViewer,
} from 'shared/components/AwardLightbox/AwardLightbox.index'
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
  const [viewer, setViewer] = useState<AwardViewer | null>(null)

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
                const awards = event.awards?.length ? event.awards : null
                const label = event.label[lang]
                const splitAt = label.lastIndexOf(' ') + 1
                const body = (
                  <>
                    {label.slice(0, splitAt)}
                    <S.Tail>
                      {label.slice(splitAt)}
                      {(linked || event.href || awards) && (
                        <S.Arrow aria-hidden='true'>
                          {event.href ? (
                            <ArrowSquareOutIcon size='1em' />
                          ) : awards ? (
                            <CertificateIcon size='1em' />
                          ) : (
                            <ArrowRightIcon size='1em' />
                          )}
                        </S.Arrow>
                      )}
                    </S.Tail>
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
                if (awards) {
                  return (
                    <S.EventButton
                      key={event.label.en}
                      type='button'
                      onClick={() => setViewer({ images: awards, alt: label })}
                    >
                      {body}
                    </S.EventButton>
                  )
                }
                return <S.Event key={event.label.en}>{body}</S.Event>
              })}
            </S.Events>
          </S.Row>
        ))}
      </S.List>
      <AwardLightbox viewer={viewer} onClose={() => setViewer(null)} />
    </S.Section>
  )
}
