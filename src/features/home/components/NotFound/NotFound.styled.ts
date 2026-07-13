import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Page = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 100vh;
  padding: 32px;
  background: ${({ theme }) => theme.colors.background};
`

export const Code = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
`

export const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;
`

export const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
