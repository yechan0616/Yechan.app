'use client'

import { experience } from 'features/experience/api'
import { useState } from 'react'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang, Strings } from 'shared/i18n/strings'
import { fade, fadeUp, stagger, viewportOnce } from 'shared/styles/motion'
import * as S from './ExperienceSection.styled'

const COLLAPSED_COUNT = 3

interface ExperienceSectionProps {
  lang: Lang
  t: Strings
}

export function ExperienceSection({ lang, t }: ExperienceSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const collapsible = experience.length > COLLAPSED_COUNT
  const visible = expanded ? experience : experience.slice(0, COLLAPSED_COUNT)

  if (experience.length === 0) return null

  return (
    <S.Section
      id='experience'
      variants={fade}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <SectionTitle>Experience</SectionTitle>
      <S.TimelineWrapper>
        <S.Timeline variants={stagger}>
          {visible.map((item) => (
            <S.TimelineItem key={item.title.en} variants={fadeUp}>
              <S.Dot aria-hidden='true' />
              <article>
                <S.TitleRow>
                  <S.ItemTitle>{item.title[lang]}</S.ItemTitle>
                  <S.Period>{item.period[lang]}</S.Period>
                </S.TitleRow>
                {item.desc[lang] && <S.Desc>{item.desc[lang]}</S.Desc>}
              </article>
            </S.TimelineItem>
          ))}
        </S.Timeline>
        {collapsible && !expanded && (
          <S.Fade>
            <S.ToggleButton type='button' onClick={() => setExpanded(true)}>
              {t.more}
              <S.ToggleIcon aria-hidden='true'>▾</S.ToggleIcon>
            </S.ToggleButton>
          </S.Fade>
        )}
      </S.TimelineWrapper>
      {collapsible && expanded && (
        <S.Center>
          <S.ToggleButton type='button' onClick={() => setExpanded(false)}>
            {t.less}
            <S.ToggleIcon aria-hidden='true'>▴</S.ToggleIcon>
          </S.ToggleButton>
        </S.Center>
      )}
    </S.Section>
  )
}
