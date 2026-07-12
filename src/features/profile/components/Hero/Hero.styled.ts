import styled from '@emotion/styled'

export const Section = styled.section`
  padding-top: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 36px;
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  hgroup {
    margin: 0;
  }
`

export const Avatar = styled.div`
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 48px;
    height: 48px;
  }
`

export const AvatarImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Name = styled.h1`
  margin: 0;
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
  margin: 8px 0 0;
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
`

export const EmailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
