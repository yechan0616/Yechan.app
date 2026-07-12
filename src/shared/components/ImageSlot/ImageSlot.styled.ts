import styled from '@emotion/styled'

export const Image = styled.img<{ radius: number }>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ radius }) => radius}px;
`

export const Placeholder = styled.div<{ radius: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ radius }) => radius}px;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
`
