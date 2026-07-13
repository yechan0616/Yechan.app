import styled from '@emotion/styled'

export const Section = styled.section``

export const Profile = styled.div`
  hgroup {
    margin: 0;
  }
`

export const Avatar = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  margin-top: -38px;
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 64px;
    height: 64px;
    margin-top: -32px;
  }
`

export const AvatarImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Name = styled.h1`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
`

export const Role = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  line-height: 1.2;
`

export const Bio = styled.p`
  max-width: 500px;
  margin: 24px 0 0;
  padding-left: 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.body};
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 20px;
    font-size: 15px;
  }
`

export const Now = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 500px;
  margin: 16px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  line-height: 1.5;
`

export const NowDot = styled.span`
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`

export const Links = styled.address`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  font-style: normal;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 16px;
  }
`

export const EmailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 3px;
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
    font-size: 15px;
  }
`

export const EmailIcon = styled.span`
  font-size: 13px;
`
