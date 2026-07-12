'use client'

import { ExperienceSection } from 'features/experience/components/ExperienceSection/ExperienceSection.index'
import { Hero } from 'features/profile/components/Hero/Hero.index'
import { projects } from 'features/projects/api'
import { ProjectDetail } from 'features/projects/components/ProjectDetail/ProjectDetail.index'
import { ProjectList } from 'features/projects/components/ProjectList/ProjectList.index'
import { SkillsSection } from 'features/skills/components/SkillsSection/SkillsSection.index'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Footer } from 'shared/components/Footer/Footer.index'
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
  const t = strings[lang]

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && projects.some((project) => project.id === saved)) {
      setSelectedId(saved)
    }
  }, [])

  const select = (id: string | null) => {
    setSelectedId(id)
    if (id) localStorage.setItem(STORAGE_KEY, id)
    else localStorage.removeItem(STORAGE_KEY)
    window.scrollTo(0, 0)
  }

  const index = projects.findIndex((project) => project.id === selectedId)
  const detail = index >= 0 ? projects[index] : null

  return (
    <MotionConfig reducedMotion='user'>
      <AnimatePresence mode='wait'>
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
              </S.Banner>
              <TopBar langLabel={t.langButton} onToggleLang={toggleLang} />
              <S.Container>
                <Hero t={t} />
                <ProjectList
                  projects={projects}
                  lang={lang}
                  onSelect={select}
                />
                <ExperienceSection lang={lang} t={t} />
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
