import type { Localized } from 'shared/i18n/strings'

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'paragraph'; text: string }

export interface Project {
  id: string
  title: Localized
  year: string
  techStack: string[]
  repositoryUrl?: string
  image?: string
  meta: Localized
  summary: Localized
  blocks: Localized<Block[]>
}
