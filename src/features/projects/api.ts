import { splitByLang } from 'shared/utils/splitByLang'
import { projects as entries } from '#content'
import type { Block, Project } from './types'

const toBlocks = (text: string): Block[] =>
  text.split(/\n\s*\n/).map((chunk) => {
    const lines = chunk.split('\n').map((line) => line.trim())
    if (lines.length === 1 && lines[0].startsWith('## ')) {
      return { type: 'heading', text: lines[0].slice(3) }
    }
    if (lines.every((line) => line.startsWith('- '))) {
      return { type: 'list', items: lines.map((line) => line.slice(2)) }
    }
    return { type: 'paragraph', text: chunk }
  })

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
      blocks: { en: toBlocks(en), ko: toBlocks(ko) },
    }
  })
