'use client'

import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react'
import type { Project } from 'features/projects/types'
import { useState } from 'react'
import { ImageSlot } from 'shared/components/ImageSlot/ImageSlot.index'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import { useIsMobile } from 'shared/hooks/useIsMobile'
import type { Lang } from 'shared/i18n/strings'
import { fade, fadeUp, stagger, viewportOnce } from 'shared/styles/motion'
import * as S from './ProjectList.styled'

const PAGE_SIZE = 5
const MOBILE_PAGE_SIZE = 3

interface ProjectListProps {
  projects: Project[]
  lang: Lang
  onSelect: (id: string) => void
}

export function ProjectList({ projects, lang, onSelect }: ProjectListProps) {
  const [rawPage, setPage] = useState(0)
  const isMobile = useIsMobile()
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : PAGE_SIZE
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize))
  const page = Math.min(rawPage, pageCount - 1)
  const paged = projects.slice(page * pageSize, (page + 1) * pageSize)

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
        {projects.length > pageSize && (
          <S.Pager>
            <S.PagerButton
              type='button'
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              aria-label='Previous projects'
            >
              <CaretLeftIcon size={13} />
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
              <CaretRightIcon size={13} />
            </S.PagerButton>
          </S.Pager>
        )}
      </S.Head>
      <S.List key={page} variants={stagger} initial='hidden' animate='visible'>
        {paged.map((project) => (
          <S.Item key={project.id} variants={fadeUp}>
            <S.ItemButton type='button' onClick={() => onSelect(project.id)}>
              <S.Content>
                <S.TitleRow>
                  <S.ItemTitle>
                    {project.title[lang]}
                    <S.Arrow aria-hidden='true'>
                      <ArrowRightIcon size='1em' />
                    </S.Arrow>
                  </S.ItemTitle>
                  <S.Year>{project.year}</S.Year>
                </S.TitleRow>
                <S.Summary>{project.summary[lang]}</S.Summary>
                <S.TechStack>{project.techStack.join(' · ')}</S.TechStack>
              </S.Content>
              <S.Thumb>
                <ImageSlot
                  image={project.image}
                  alt={project.title[lang]}
                  radius={0}
                  loading='lazy'
                />
              </S.Thumb>
            </S.ItemButton>
          </S.Item>
        ))}
      </S.List>
    </S.Section>
  )
}
