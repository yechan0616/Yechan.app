import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 56px;
  }
`

export const Prose = styled.div`
  max-width: 560px;
  margin-top: 16px;
`

export const Sentence = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.body};
  font-size: 15px;
  line-height: 1.8;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`

export const Marquee = styled.div`
  overflow: hidden;
  margin-top: 24px;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 40px,
    black calc(100% - 40px),
    transparent
  );
`

export const Track = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
`

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  padding-right: 36px;
`

export const SkillItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

export const SkillIcon = styled.img`
  display: block;
  height: 18px;
  width: auto;
`
