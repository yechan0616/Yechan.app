'use client'

import { HistorySection } from 'features/history/components/HistorySection/HistorySection.index'
import { Hero } from 'features/profile/components/Hero/Hero.index'
import { projects } from 'features/projects/api'
import { ProjectDetail } from 'features/projects/components/ProjectDetail/ProjectDetail.index'
import { ProjectList } from 'features/projects/components/ProjectList/ProjectList.index'
import { SkillsSection } from 'features/skills/components/SkillsSection/SkillsSection.index'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Footer } from 'shared/components/Footer/Footer.index'
import { jumpTo } from 'shared/components/SmoothScroll/SmoothScroll.index'
import { TopBar } from 'shared/components/TopBar/TopBar.index'
import { useLang } from 'shared/hooks/useLang'
import { strings } from 'shared/i18n/strings'
import { easeOutExpo } from 'shared/styles/motion'
import { asset } from 'shared/utils/asset'
import * as S from './PortfolioPage.styled'

const PARAM = 'project'

// 현재 URL의 ?project= 값이 실제 프로젝트를 가리키면 그 id를 돌려줍니다
const readProjectParam = () => {
  const id = new URLSearchParams(window.location.search).get(PARAM)
  return id && projects.some((project) => project.id === id) ? id : null
}

/* 시스템 뒤로가기(스와이프 포함)는 브라우저가 자체 전환을 보여주므로,
   그 위에 우리 애니메이션이 겹치지 않도록 instant일 땐 즉시 교체합니다 */
const viewVariants = {
  initial: (instant: boolean) =>
    instant ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
  animate: (instant: boolean) => ({
    opacity: 1,
    y: 0,
    transition: instant
      ? { duration: 0 }
      : { duration: 0.55, ease: easeOutExpo },
  }),
  exit: (instant: boolean) => ({
    opacity: instant ? 1 : 0,
    transition: { duration: instant ? 0 : 0.15 },
  }),
}

export function PortfolioPage() {
  const { lang, toggleLang } = useLang()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [instantNav, setInstantNav] = useState(false)
  const listScroll = useRef(0)
  // 상세 히스토리를 우리가 쌓았는지 — 쌓았다면 뒤로가기 버튼이 history.back()으로 되돌립니다
  const pushedDetail = useRef(false)
  // 다음 popstate가 우리 뒤로가기 버튼에서 온 것인지 표시합니다
  const expectPop = useRef(false)
  const t = strings[lang]

  useEffect(() => {
    // 스크롤 복원은 onExitComplete에서 직접 처리하므로 브라우저 기본 동작을 끕니다
    history.scrollRestoration = 'manual'
    const initial = readProjectParam()
    if (initial) {
      // 공유 링크로 바로 들어온 경우 목록을 거치는 전환 없이 상세를 띄웁니다
      setInstantNav(true)
      setSelectedId(initial)
    }
    // 브라우저 뒤로/앞으로 가기를 URL 파라미터와 동기화합니다
    const onPopState = () => {
      const id = readProjectParam()
      setInstantNav(!expectPop.current)
      expectPop.current = false
      pushedDetail.current = id !== null
      setSelectedId(id)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const select = (id: string | null) => {
    if (id && !selectedId) listScroll.current = window.scrollY
    setInstantNav(false)
    if (!id && pushedDetail.current) {
      pushedDetail.current = false
      expectPop.current = true
      history.back()
      return
    }
    const url = id
      ? `${window.location.pathname}?${PARAM}=${id}`
      : window.location.pathname
    if (id && selectedId) {
      history.replaceState(null, '', url)
    } else if (id) {
      history.pushState(null, '', url)
      pushedDetail.current = true
    } else {
      // 공유 링크로 바로 들어온 상세: 아래에 목록 히스토리가 없으므로 교체합니다
      history.replaceState(null, '', url)
    }
    setSelectedId(id)
  }

  const index = projects.findIndex((project) => project.id === selectedId)
  const detail = index >= 0 ? projects[index] : null

  return (
    <MotionConfig reducedMotion='user'>
      <AnimatePresence
        mode='wait'
        custom={instantNav}
        onExitComplete={() => {
          if (detail) {
            jumpTo(0)
            return
          }
          // 목록 화면이 마운트되어 문서 높이가 복원된 다음에 점프해야
          // 저장해 둔 위치가 잘리지 않습니다
          requestAnimationFrame(() =>
            requestAnimationFrame(() => jumpTo(listScroll.current)),
          )
        }}
      >
        {detail ? (
          <motion.div
            key={detail.id}
            custom={instantNav}
            variants={viewVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <ProjectDetail
              project={detail}
              prev={projects[index - 1]}
              next={projects[index + 1]}
              lang={lang}
              t={t}
              onBack={() => select(null)}
              onSelect={select}
            />
          </motion.div>
        ) : (
          <motion.div
            key='list'
            custom={instantNav}
            variants={viewVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <S.Page>
              <S.Banner>
                <S.BannerImage src={asset('/assets/banner.jpeg')} alt='' />
                <TopBar lang={lang} onToggleLang={toggleLang} />
              </S.Banner>
              <S.Container>
                <Hero t={t} />
                <ProjectList
                  projects={projects}
                  lang={lang}
                  onSelect={select}
                />
                <HistorySection lang={lang} onSelect={select} />
                <SkillsSection lang={lang} />
                <Footer lang={lang} t={t} />
              </S.Container>
            </S.Page>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
