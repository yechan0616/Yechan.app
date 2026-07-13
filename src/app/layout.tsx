import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { SmoothScroll } from 'shared/components/SmoothScroll/SmoothScroll.index'
import { EmotionProvider } from 'shared/styles/EmotionProvider'
import { GlobalStyles } from 'shared/styles/GlobalStyles'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://yechan.app'),
  title: 'Yechan Moon - Frontend Developer',
  description:
    '필요한 것만 남겨 더 나은 경험을 만드는 프론트엔드 개발자 문예찬의 포트폴리오',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Yechan Moon - Frontend Developer',
    description:
      '필요한 것만 남겨 더 나은 경험을 만드는 프론트엔드 개발자 문예찬의 포트폴리오',
    url: 'https://yechan.app',
    siteName: 'Yechan.app',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        {/* 한글 글리프용 Pretendard — 동적 서브셋이라 필요한 조각만 내려받습니다 */}
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
        />
        <EmotionProvider>
          <GlobalStyles />
          <SmoothScroll>{children}</SmoothScroll>
        </EmotionProvider>
      </body>
    </html>
  )
}
