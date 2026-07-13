import styled from '@emotion/styled'

export const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s ease, opacity 0.15s ease;

  &:active {
    opacity: 0.4;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
  }
`
