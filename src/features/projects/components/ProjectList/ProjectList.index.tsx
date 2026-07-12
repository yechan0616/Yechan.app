'use client'

import type { Project } from 'features/projects/types'
import { useState } from 'react'
import { ImageSlot } from 'shared/components/ImageSlot/ImageSlot.index'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang } from 'shared/i18n/strings'
import { fade, fadeUp, stagger, viewportOnce } from 'shared/styles/motion'
import * as S from './ProjectList.styled'

const PAGE_SIZE = 5

interface ProjectListProps {
  projects: Project[]
  lang: Lang
  onSelect: (id: string) => void
}

export function ProjectList({ projects, lang, onSelect }: ProjectListProps) {
  const [page, setPage] = useState(0)
  const pageCount = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))
  const paged = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <S.Section
      id='projects'
      variants={fade}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <S.Head>
        <SectionTitle>Projects</SectionTitle>
        {projects.length > PAGE_SIZE && (
          <S.Pager>
            <S.PagerButton
              type='button'
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              aria-label='Previous projects'
            >
              ‹
            </S.PagerButton>
            <S.PageLabel>
              {page + 1} / {pageCount}
            </S.PageLabel>
            <S.PagerButton
              type='button'
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount - 1}
              aria-label='Next projects'
            >
              ›
            </S.PagerButton>
          </S.Pager>
        )}
      </S.Head>
      <S.List variants={stagger}>
        {paged.map((project) => (
          <S.Item key={project.id} variants={fadeUp}>
            <S.ItemButton type='button' onClick={() => onSelect(project.id)}>
              <article>
                <S.TitleRow>
                  <S.ItemTitle>
                    {project.title[lang]}
                    <S.Arrow aria-hidden='true'>→</S.Arrow>
                  </S.ItemTitle>
                  <S.Year>{project.year}</S.Year>
                </S.TitleRow>
                <S.Summary>{project.summary[lang]}</S.Summary>
                <S.TechStack>{project.techStack.join(' · ')}</S.TechStack>
              </article>
            </S.ItemButton>
            <S.Thumb>
              <ImageSlot image={project.image} alt={project.title[lang]} />
            </S.Thumb>
          </S.Item>
        ))}
      </S.List>
    </S.Section>
  )
}
