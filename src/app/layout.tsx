import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { SmoothScroll } from 'shared/components/SmoothScroll/SmoothScroll.index'
import { EmotionProvider } from 'shared/styles/EmotionProvider'
import { GlobalStyles } from 'shared/styles/GlobalStyles'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://yechan.app'),
  title: 'Yechan Moon',
  description: 'so far so good - Frontend Developer',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Yechan Moon',
    description: 'so far so good - Frontend Developer',
    url: 'https://yechan.app',
    siteName: 'Yechan.app',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121210' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.variable} suppressHydrationWarning>
      <body>
        {/* 페인트 전에 저장된 모드(없으면 시스템 설정)를 적용해 플래시를 막습니다 */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: 페인트 전 실행이 필요한 인라인 스크립트
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('portfolio-color-mode');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.dataset.mode=d?'dark':'light';e.style.colorScheme=d?'dark':'light';}catch(e){}})()`,
          }}
        />
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
