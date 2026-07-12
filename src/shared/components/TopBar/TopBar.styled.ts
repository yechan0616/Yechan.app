import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 16px 32px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 8px;
`

export const FontControls = styled.fieldset`
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  border: 0;
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Divider = styled.span`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.divider};
`

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 6px;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
