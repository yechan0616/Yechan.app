import styled from '@emotion/styled'

export const Container = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.pill};
  backdrop-filter: blur(8px);
  border-radius: 8px;
`

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 56px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:active {
    opacity: 0.4;
  }
`

export const LangOption = styled.span<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.text : theme.colors.faint};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  transition: color 0.15s ease;
`

export const LangSlash = styled.span`
  color: ${({ theme }) => theme.colors.faint};
  font-weight: 400;
`
