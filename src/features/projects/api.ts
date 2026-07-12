import { splitByLang } from 'shared/utils/splitByLang'
import { projects as entries } from '#content'
import type { Project } from './types'

const toParagraphs = (text: string) => text.split(/\n\s*\n/)

export const projects: Project[] = [...entries]
  .sort((a, b) => b.year - a.year || a.order - b.order)
  .map((entry) => {
    const { en, ko } = splitByLang(entry.raw)
    return {
      id: entry.id,
      title: entry.title,
      year: String(entry.year),
      techStack: entry.techStack,
      repositoryUrl: entry.repositoryUrl,
      image: entry.image,
      meta: entry.meta,
      summary: entry.summary,
      paragraphs: { en: toParagraphs(en), ko: toParagraphs(ko) },
    }
  })
