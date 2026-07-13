import styled from '@emotion/styled'

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 64px 32px 96px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 20px 80px;
  }
`

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 16px 12px 0;
    font-size: 13px;
  }
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 28px;
  }
`

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }
`

export const Year = styled.time`
  flex: none;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
`

export const Meta = styled.p`
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.soft};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 14px;
    font-size: 12px;
  }
`

export const TechStack = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.faint};
  font-size: 13px;
  line-height: 1.5;
`

export const Rule = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 32px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

export const Slot = styled.div`
  width: 100%;
  height: 340px;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 240px;
    margin: 28px -20px;
    width: auto;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    img,
    > div {
      border: 0;
      border-radius: 0;
    }
  }
`

export const Paragraphs = styled.div`
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.body};
    font-size: 14px;
    line-height: 1.75;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    p {
      font-size: 13px;
    }
  }
`

export const RepoRow = styled.div`
  margin-top: 28px;
`

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 64px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  div {
    min-width: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 56px;
  }
`

export const NavButton = styled.button<{ align?: 'end' }>`
  display: inline-flex;
  flex-direction: column;
  align-items: ${({ align }) => (align === 'end' ? 'flex-end' : 'flex-start')};
  gap: 4px;
  padding: 8px 0;
  border: 0;
  background: none;
  text-align: ${({ align }) => (align === 'end' ? 'right' : 'left')};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:active {
    opacity: 0.4;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.55;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 6px;
    padding: 12px 0;
  }
`

export const NavLabel = styled.span`
  color: ${({ theme }) => theme.colors.faint};
  font-size: 12px;
`

export const NavTitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 13px;
  }
`
