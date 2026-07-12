import styled from '@emotion/styled'

export const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
