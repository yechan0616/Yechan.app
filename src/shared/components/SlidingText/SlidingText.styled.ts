import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const FADE = 16

const slide = keyframes`
  0%, 15% { transform: translateX(0); }
  85%, 100% { transform: translateX(var(--slide)); }
`

/* 텍스트와 같은 타이밍으로 마스크를 움직여, 숨은 내용이 있는 쪽만 페이드합니다.
   시작 위치에선 왼쪽 페이드가 화면 밖에 있어 첫 글자가 잘리지 않습니다 */
const maskSlide = keyframes`
  0%, 15% { mask-position: -${FADE}px 0; }
  85%, 100% { mask-position: 0 0; }
`

export const Viewport = styled.span<{ sliding: boolean }>`
  display: block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;

  ${({ sliding }) =>
    sliding &&
    css`
      mask-image: linear-gradient(
        to right,
        transparent,
        #000 ${FADE}px,
        #000 calc(100% - ${FADE}px),
        transparent
      );
      mask-size: calc(100% + ${FADE}px) 100%;
      mask-repeat: no-repeat;
      animation: ${maskSlide} var(--slide-duration) ease-in-out infinite
        alternate;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    mask-image: none;
  }
`

export const Track = styled.span<{ sliding: boolean }>`
  display: inline-block;

  ${({ sliding }) =>
    sliding &&
    css`
      animation: ${slide} var(--slide-duration) ease-in-out infinite
        alternate;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
