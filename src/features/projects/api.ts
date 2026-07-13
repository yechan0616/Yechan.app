import { splitByLang } from 'shared/utils/splitByLang'
import { projects as entries } from '#content'
import type { Project } from './types'

const toParagraphs = (text: string) => text.split(/\n\s*\n/)

export const projects: Project[] = [...entries]
  .sort((a, b) => a.order - b.order || b.year - a.year)
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
