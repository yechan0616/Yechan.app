import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { SmoothScroll } from 'shared/components/SmoothScroll/SmoothScroll.index'
import { EmotionProvider } from 'shared/styles/EmotionProvider'
import { GlobalStyles } from 'shared/styles/GlobalStyles'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Yechan Moon - Frontend Developer',
  description: 'ㅎㅇ',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <EmotionProvider>
          <GlobalStyles />
          <SmoothScroll>{children}</SmoothScroll>
        </EmotionProvider>
      </body>
    </html>
  )
}
