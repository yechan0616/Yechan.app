import styled from '@emotion/styled'

export const Container = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 8px;
`

export const FontControls = styled.fieldset`
  display: flex;
  align-items: center;
  gap: 0;
  margin: 0;
  padding: 0;
  border: 0;
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.soft};
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

export const Divider = styled.span`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.divider};
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
