import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 56px;
  }
`

export const List = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 16px 0 0;
  padding: 0;
`

export const Row = styled(motion.li)`
  display: flex;
  gap: 24px;
  padding: 14px 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const Year = styled.span`
  flex: none;
  width: 48px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
`

export const Events = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`

export const Event = styled.div`
  color: ${({ theme }) => theme.colors.soft};
  font-size: 14px;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
  }
`

export const EventButton = styled.button`
  display: block;
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.soft};
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:active {
    opacity: 0.4;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.55;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
  }
`

export const EventLink = EventButton.withComponent('a')

export const Tail = styled.span`
  white-space: nowrap;
`

export const Arrow = styled.span`
  display: inline-block;
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  line-height: 0;
  vertical-align: -1px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 12px;
  }
`

export const EventDesc = styled.p`
  margin: 2px 0 0;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 12px;
  }
`
