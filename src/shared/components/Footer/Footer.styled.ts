import styled from '@emotion/styled'

export const Footer = styled.footer`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-top: 96px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  line-height: 1.4;
`

export const Updated = styled.span`
  position: relative;
  cursor: help;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    font-size: 11px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  &[data-tooltip='']::after {
    display: none;
  }
`

export const EmailLink = styled.a`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  font-weight: 500;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
