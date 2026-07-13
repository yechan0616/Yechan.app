import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 48px;
  }
`

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Pager = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const PagerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  cursor: pointer;
  transition: color 0.15s ease, opacity 0.15s ease;

  &:active:not(:disabled) {
    opacity: 0.4;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export const PageLabel = styled.span`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`

export const List = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 12px 0 -14px;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 44px;
    margin: 20px 0 0;
  }
`

export const Item = styled(motion.li)``

export const ItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 20px;
  width: calc(100% + 32px);
  margin: 0 -16px;
  padding: 14px 16px;
  border: 0;
  border-radius: 12px;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;

  /* 스크롤 중 스치는 터치에는 반응하지 않도록 진입만 살짝 늦춥니다 */
  &:active {
    opacity: 0.6;
    transition-delay: 0.1s;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.surface};
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    gap: 14px;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 0;

    @media (hover: hover) {
      &:hover {
        background: none;
        opacity: 0.75;
      }

      &:hover img {
        transform: none;
      }
    }
  }
`

export const Content = styled.article`
  flex: 1;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`

export const ItemTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

export const Arrow = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  font-weight: 400;
`

export const Year = styled.time`
  flex: none;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
`

export const Summary = styled.p`
  margin: 8px 0 0;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.soft};
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 6px;
    max-width: none;
    font-size: 13px;
  }
`

export const TechStack = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 6px;
  }
`

export const Thumb = styled.div`
  flex: none;
  width: 128px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;

  img {
    border: 0;
    transition: transform 0.25s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: auto;
    aspect-ratio: 350 / 197;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.surface};
  }
`
