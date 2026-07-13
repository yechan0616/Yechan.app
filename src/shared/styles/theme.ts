// 실제 색값은 라이트/다크 팔레트로 정의하고, 컴포넌트는 CSS 변수를 통해 참조합니다.
// 모드 전환은 <html data-mode>만 바꾸면 되므로 리렌더 없이 즉시 적용됩니다.
export const palettes = {
  light: {
    background: '#ffffff',
    text: '#191919',
    body: '#444444',
    soft: '#57564f',
    muted: '#767676',
    faint: '#9b9a97',
    border: '#e7e7e5',
    divider: '#d9d8d5',
    surface: '#f7f7f5',
    accent: '#16a34a',
    pill: 'rgba(255, 255, 255, 0.85)',
  },
  dark: {
    background: '#121210',
    text: '#ececea',
    body: '#c8c8c5',
    soft: '#b1b0aa',
    muted: '#91918e',
    faint: '#7c7b76',
    border: '#2a2a27',
    divider: '#3a3a36',
    surface: '#1c1c1a',
    accent: '#22c55e',
    pill: 'rgba(28, 28, 26, 0.75)',
  },
} as const

export const theme = {
  colors: {
    background: 'var(--c-background)',
    text: 'var(--c-text)',
    body: 'var(--c-body)',
    soft: 'var(--c-soft)',
    muted: 'var(--c-muted)',
    faint: 'var(--c-faint)',
    border: 'var(--c-border)',
    divider: 'var(--c-divider)',
    surface: 'var(--c-surface)',
    accent: 'var(--c-accent)',
    pill: 'var(--c-pill)',
  },
  layout: {
    maxWidth: '680px',
  },
  breakpoints: {
    sm: '480px',
  },
} as const

export type AppTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
