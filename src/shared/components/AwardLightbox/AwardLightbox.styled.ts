import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`

export const Figure = styled(motion.figure)`
  position: relative;
  margin: 0;
`

/* 이미지 로드 전에도 자리를 잡아 스피너가 중앙에 뜨도록 A4 비율로 고정합니다 */
export const ImageFrame = styled(motion.div)`
  position: relative;
  width: min(90vw, calc(min(78vh, 78dvh) * 0.707), 480px);
  aspect-ratio: 707 / 1000;
  touch-action: pan-y;
`

export const Image = styled.img<{ loaded: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.25s ease;
  -webkit-user-drag: none;
  user-select: none;
`

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 28px;
  height: 28px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

export const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.22);
    }
  }
`

export const NavButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ side }) => side}: -56px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.22);
    }
  }

  @media (max-width: 640px) {
    ${({ side }) => side}: 8px;
    background: rgba(0, 0, 0, 0.35);
  }
`

export const Counter = styled.figcaption`
  margin-top: 14px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`
