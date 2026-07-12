'use client'

import { otherSkills } from 'features/skills/api'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang } from 'shared/i18n/strings'
import { fadeUp, viewportOnce } from 'shared/styles/motion'
import * as S from './SkillsSection.styled'

export function SkillsSection({ lang }: { lang: Lang }) {
  return (
    <S.Section
      id='skills'
      variants={fadeUp}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <SectionTitle>Skills</SectionTitle>
      <S.Prose>
        {lang === 'en' ? (
          <S.Sentence>
            I mostly build with <strong>TypeScript</strong>,{' '}
            <strong>React</strong>, and <strong>Next.js</strong> styled with{' '}
            <strong>Emotion</strong>.
          </S.Sentence>
        ) : (
          <S.Sentence>
            주로 <strong>TypeScript</strong>와 <strong>React</strong>,{' '}
            <strong>Next.js</strong>, <strong>Emotion</strong>을 사용해요.
          </S.Sentence>
        )}
        <S.OtherSkills>{otherSkills.join(' · ')}</S.OtherSkills>
      </S.Prose>
    </S.Section>
  )
}
