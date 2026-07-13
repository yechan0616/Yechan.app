'use client'

import { ExperienceSection } from 'features/experience/components/ExperienceSection/ExperienceSection.index'
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
import { asset } from 'shared/utils/asset'
import * as S from './PortfolioPage.styled'

const STORAGE_KEY = 'portfolio-selected-project'

const viewMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
  transition: { duration: 0.4, ease: 'easeOut' },
} as const

export function PortfolioPage() {
  const { lang, toggleLang } = useLang()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const listScroll = useRef(0)
  const t = strings[lang]

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && projects.some((project) => project.id === saved)) {
      setSelectedId(saved)
    }
  }, [])

  const select = (id: string | null) => {
    // 목록에서 상세로 들어갈 때의 위치를 기억해 뒤로 왔을 때 복원합니다
    if (id && !selectedId) listScroll.current = window.scrollY
    setSelectedId(id)
    if (id) localStorage.setItem(STORAGE_KEY, id)
    else localStorage.removeItem(STORAGE_KEY)
  }

  const index = projects.findIndex((project) => project.id === selectedId)
  const detail = index >= 0 ? projects[index] : null

  return (
    <MotionConfig reducedMotion='user'>
      <AnimatePresence
        mode='wait'
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
          <motion.div key={detail.id} {...viewMotion}>
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
          <motion.div key='list' {...viewMotion}>
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
                <ExperienceSection lang={lang} t={t} />
                <HistorySection lang={lang} />
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
