export const theme = {
  colors: {
    background: '#ffffff',
    text: '#191919',
    body: '#444444',
    soft: '#57564f',
    muted: '#767676',
    faint: '#9b9a97',
    border: '#e7e7e5',
    divider: '#ececec',
    surface: '#f7f7f5',
    accent: '#16a34a',
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
