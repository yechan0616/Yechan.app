import styled from '@emotion/styled'

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const Banner = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 140px;
  }
`

export const BannerImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 62%;
`

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 32px 96px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 20px 80px;
  }
`
