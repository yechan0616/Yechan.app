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
