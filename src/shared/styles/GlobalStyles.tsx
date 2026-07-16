'use client'

import { css, Global, useTheme } from '@emotion/react'
import { palettes } from './theme'

const cssVars = (palette: Record<string, string>) =>
  Object.entries(palette)
    .map(([name, value]) => `--c-${name}: ${value};`)
    .join('\n')

export function GlobalStyles() {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        :root {
          ${cssVars(palettes.light)}
        }

        html[data-mode='dark'] {
          ${cssVars(palettes.dark)}
        }

        /* 모드 전환 순간에만 붙는 클래스 — 색상만 천천히 크로스페이드합니다 */
        html.mode-transition,
        html.mode-transition *,
        html.mode-transition *::before,
        html.mode-transition *::after {
          transition:
            background-color 0.7s ease,
            color 0.7s ease,
            border-color 0.7s ease,
            fill 0.7s ease,
            stroke 0.7s ease !important;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        body {
          margin: 0;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: var(--font-inter), 'Pretendard Variable', -apple-system,
            BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', sans-serif;
          -webkit-font-smoothing: antialiased;
          word-break: keep-all;
          overflow-wrap: break-word;
          user-select: none;
          -webkit-user-select: none;
        }

        a {
          color: inherit;
          text-decoration: none;
          -webkit-user-drag: none;
        }

        img {
          -webkit-user-drag: none;
        }

        button {
          font: inherit;
        }

        button:disabled {
          opacity: 0.3;
          cursor: default;
        }
      `}
    />
  )
}
