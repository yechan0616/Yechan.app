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
    history: {
      name: 'History',
      pattern: 'history/index.yml',
      single: true,
      schema: s.object({
        items: s.array(
          s.object({
            year: s.number(),
            events: s.array(
              s.object({
                label: localized,
                desc: localized.optional(),
                // 관련 프로젝트 id — 클릭 시 해당 상세 페이지로 이동합니다
                project: s.string().optional(),
                // 프로젝트가 아닌 자료(상장 등)로 연결할 외부/내부 링크
                href: s.string().optional(),
                // 상장/수료증 스캔 이미지 — 클릭 시 라이트박스로 열립니다
                awards: s.array(s.string()).optional(),
              }),
            ),
          }),
        ),
      }),
    },
    skills: {
      name: 'Skills',
      pattern: 'skills/index.yml',
      single: true,
      schema: s.object({
        other: s.array(s.string()),
        certifications: s.array(
          s.object({
            ko: s.string(),
            en: s.string(),
            // 실물 자격증 스캔 이미지 — 클릭 시 라이트박스로 열립니다
            award: s.string().optional(),
          }),
        ),
      }),
    },
  },
})
