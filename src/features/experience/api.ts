import type { Localized } from 'shared/i18n/strings'
import { splitByLang } from 'shared/utils/splitByLang'
import { experience as entries } from '#content'

export interface ExperienceItem {
  title: Localized
  period: Localized
  desc: Localized
}

export const experience: ExperienceItem[] = [...entries]
  .sort((a, b) => a.order - b.order)
  .map((entry) => {
    const { en, ko } = splitByLang(entry.raw)
    return {
      title: entry.title,
      period: entry.period,
      desc: { en, ko },
    }
  })
