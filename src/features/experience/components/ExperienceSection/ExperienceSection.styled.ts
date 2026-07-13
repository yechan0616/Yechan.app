import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 56px;
  }
`

export const TimelineWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`

export const Timeline = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`

export const TimelineItem = styled(motion.li)`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: 24px;

  article {
    padding: 0 0 24px;
  }
`

export const Dot = styled.span`
  position: absolute;
  left: -3.5px;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

export const Period = styled.span`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
`

export const Desc = styled.p`
  margin: 8px 0 0;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.soft};
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
  }
`

export const Fade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 110px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    ${({ theme }) => theme.colors.background} 78%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;

  button {
    pointer-events: auto;
  }
`

export const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease, opacity 0.15s ease;

  &:active {
    opacity: 0.4;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export const ToggleIcon = styled.span`
  font-size: 11px;
`
