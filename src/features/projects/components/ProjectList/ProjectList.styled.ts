import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;
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
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const PageLabel = styled.span`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`

export const List = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`

export const Item = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const ItemButton = styled.button`
  display: block;
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 16px 0;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.55;
  }
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`

export const ItemTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
`

export const Arrow = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  font-weight: 400;
`

export const Year = styled.time`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
`

export const Summary = styled.p`
  margin: 8px 0 0;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.soft};
  font-size: 14px;
  line-height: 1.6;
`

export const TechStack = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  line-height: 1.5;
`

export const Thumb = styled.div`
  flex: none;
  width: 104px;
  height: 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80px;
    height: 56px;
  }
`
