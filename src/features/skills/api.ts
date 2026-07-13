import { skills } from '#content'

const icons: Record<string, string> = {
  JavaScript: 'javascript',
  Java: 'java',
  'Spring Boot': 'spring-boot',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  Redis: 'redis',
  'TanStack Query': 'tanstack-query',
  'Tailwind CSS': 'tailwind-css',
  Docker: 'docker',
  AWS: 'aws',
  'GitHub Actions': 'github-actions',
  Figma: 'figma',
}

export interface Skill {
  name: string
  icon?: string
}

export const otherSkills: Skill[] = skills.other.map((name) => ({
  name,
  icon: icons[name] ? `/assets/skills/${icons[name]}.svg` : undefined,
}))
