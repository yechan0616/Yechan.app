export type Lang = 'en' | 'ko'

export type Localized<T = string> = Record<Lang, T>

export const strings = {
  en: {
    role: 'Frontend Developer',
    bio: 'Keeping only what matters, building better experiences.',
    now: '',
    email: 'Email',
    copied: 'Copied!',
    langButton: '한국어',
    back: 'Back',
    prev: 'Previous',
    next: 'Next',
    more: 'Show more',
    less: 'Show less',
    updated: 'Last updated',
    slotPlaceholder: 'Project screenshot coming soon',
  },
  ko: {
    role: '프론트엔드 개발자',
    bio: '필요한 것만 남겨 더 나은 경험을 만들고 있어요.',
    now: '',
    email: 'Email',
    copied: '복사됨!',
    langButton: 'English',
    back: '뒤로',
    prev: '이전',
    next: '다음',
    more: '더 보기',
    less: '접기',
    updated: '마지막 업데이트',
    slotPlaceholder: '프로젝트 스크린샷 준비 중',
  },
} as const

export type Strings = (typeof strings)[Lang]
