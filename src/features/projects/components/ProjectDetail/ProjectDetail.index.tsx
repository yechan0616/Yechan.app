'use client'

import type { Project } from 'features/projects/types'
import { ImageSlot } from 'shared/components/ImageSlot/ImageSlot.index'
import { TextLink } from 'shared/components/TextLink/TextLink.index'
import type { Lang, Strings } from 'shared/i18n/strings'
import * as S from './ProjectDetail.styled'

interface ProjectDetailProps {
  project: Project
  prev?: Project
  next?: Project
  lang: Lang
  t: Strings
  onBack: () => void
  onSelect: (id: string) => void
}

export function ProjectDetail({
  project,
  prev,
  next,
  lang,
  t,
  onBack,
  onSelect,
}: ProjectDetailProps) {
  return (
    <S.Page>
      <S.Container>
        <S.BackButton type='button' onClick={onBack}>
          <span aria-hidden='true'>←</span>
          {t.back}
        </S.BackButton>

        <S.TitleRow>
          <S.Title>{project.title[lang]}</S.Title>
          <S.Year>{project.year}</S.Year>
        </S.TitleRow>

        <S.Meta>{project.meta[lang]}</S.Meta>
        <S.TechStack>{project.techStack.join(' · ')}</S.TechStack>

        <S.Rule aria-hidden='true' />

        <S.Slot>
          <ImageSlot
            image={project.image}
            alt={project.title[lang]}
            label={t.slotPlaceholder}
            radius={10}
          />
        </S.Slot>

        <S.Paragraphs>
          {project.paragraphs[lang].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </S.Paragraphs>

        {project.repositoryUrl && (
          <S.RepoRow>
            <TextLink href={project.repositoryUrl}>GitHub</TextLink>
          </S.RepoRow>
        )}

        <S.Nav aria-label='Project navigation'>
          <div>
            {prev && (
              <S.NavButton type='button' onClick={() => onSelect(prev.id)}>
                <S.NavLabel>← {t.prev}</S.NavLabel>
                <S.NavTitle>{prev.title[lang]}</S.NavTitle>
              </S.NavButton>
            )}
          </div>
          <div>
            {next && (
              <S.NavButton
                type='button'
                onClick={() => onSelect(next.id)}
                align='end'
              >
                <S.NavLabel>{t.next} →</S.NavLabel>
                <S.NavTitle>{next.title[lang]}</S.NavTitle>
              </S.NavButton>
            )}
          </div>
        </S.Nav>
      </S.Container>
    </S.Page>
  )
}
