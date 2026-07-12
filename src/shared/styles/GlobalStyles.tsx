'use client'

import { css, Global, useTheme } from '@emotion/react'

export function GlobalStyles() {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont,
            'Segoe UI', 'Apple SD Gothic Neo', sans-serif;
          -webkit-font-smoothing: antialiased;
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
