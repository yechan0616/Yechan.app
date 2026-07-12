import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH,
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    emotion: true,
  },
}

// Turbopack에서는 webpack 플러그인을 쓸 수 없어 config 로드 시점에 velite를 실행합니다
// https://velite.js.org/guide/with-nextjs
export default async function config(): Promise<NextConfig> {
  if (!process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = '1'
    const isDev = process.env.NODE_ENV === 'development'
    const { build } = await import('velite')
    // strict는 배포 빌드에서만: 깨진 frontmatter가 조용히 누락된 채 배포되는 것을 막되,
    // dev에서는 md 저장 중 에러로 서버가 종료되지 않게 합니다
    const built = build({ watch: isDev, clean: !isDev, strict: !isDev })
    if (!isDev) {
      await built
    }
  }
  return nextConfig
}
