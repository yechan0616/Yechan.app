import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Section = styled(motion.section)`
  margin-top: 64px;
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
`

export const OtherSkills = styled.p`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  line-height: 1.8;
`
