import { defineConfig, s } from 'velite'

// 문자열 하나면 양쪽 언어에 같이 쓰고, { ko, en } 객체면 언어별로 씁니다
const localized = s
  .union([s.string(), s.number(), s.object({ en: s.string(), ko: s.string() })])
  .transform((value) =>
    typeof value === 'object'
      ? value
      : { en: String(value), ko: String(value) },
  )

export default defineConfig({
  collections: {
    projects: {
      name: 'Project',
      pattern: 'projects/*.md',
      schema: s
        .object({
          title: localized,
          year: s.number(),
          order: s.number().default(0),
          techStack: s.array(s.string()),
          repositoryUrl: s.string().url().optional(),
          image: s.string().optional(),
          meta: localized,
          summary: localized,
          raw: s.raw(),
          path: s.path(),
        })
        .transform(({ path, ...project }) => ({
          ...project,
          id: path.replace(/^projects\//, ''),
        })),
    },
    experience: {
      name: 'Experience',
      pattern: 'experience/*.md',
      schema: s.object({
        title: localized,
        period: localized,
        order: s.number().default(0),
        raw: s.raw(),
      }),
    },
    skills: {
      name: 'Skills',
      pattern: 'skills/index.yml',
      single: true,
      schema: s.object({
        other: s.array(s.string()),
      }),
    },
    history: {
      name: 'History',
      pattern: 'history/index.yml',
      single: true,
      schema: s.object({
        items: s.array(
          s.object({
            year: s.number(),
            events: s.array(localized),
          }),
        ),
      }),
    },
  },
})
