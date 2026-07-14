'use client'

import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react'
import type { Project } from 'features/projects/types'
import {
  AnimatePresence,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ImageSlot } from 'shared/components/ImageSlot/ImageSlot.index'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import { SlidingText } from 'shared/components/SlidingText/SlidingText.index'
import { useIsMobile } from 'shared/hooks/useIsMobile'
import type { Lang } from 'shared/i18n/strings'
import {
  easeOutExpo,
  fade,
  fadeUp,
  stagger,
  viewportOnce,
} from 'shared/styles/motion'
import * as S from './ProjectList.styled'

const PAGE_SIZE = 5
const MOBILE_PAGE_SIZE = 3

interface ProjectListProps {
  projects: Project[]
  lang: Lang
  onSelect: (id: string) => void
}

export function ProjectList({ projects, lang, onSelect }: ProjectListProps) {
  const [rawPage, setPage] = useState(0)
  const isMobile = useIsMobile()
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : PAGE_SIZE
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize))
  const page = Math.min(rawPage, pageCount - 1)
  const paged = projects.slice(page * pageSize, (page + 1) * pageSize)

  // 페이지 전환으로 항목 수가 달라질 때 아래 섹션이 점프하지 않도록 높이를 애니메이션합니다
  const listRef = useRef<HTMLDivElement>(null)
  const [listHeight, setListHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setListHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const listX = useMotionValue(0)
  const maskLeft = useTransform(listX, (value) => Math.max(0, -value) * 2.5)
  const maskRight = useTransform(listX, (value) => Math.max(0, value) * 2.5)
  const textMask = useMotionTemplate`linear-gradient(
    to right,
    transparent,
    black ${maskLeft}px,
    black calc(100% - ${maskRight}px),
    transparent
  )`

  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const gesture = useRef<'horizontal' | 'vertical' | null>(null)

  // velocity: 0 — 빠른 플릭 직후엔 motion value의 순간 속도가 매우 커서 복귀 스프링이 튀거나 발산할 수 있습니다
  const settleBack = () =>
    animate(listX, 0, {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      velocity: 0,
    })

  const handleTouchStart = (event: React.TouchEvent) => {
    if (!isMobile) return
    listX.stop()
    gesture.current = null
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    const start = touchStart.current
    if (!start) return
    const touch = event.touches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (!gesture.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      gesture.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    }
    if (gesture.current !== 'horizontal') return
    const hasTarget = dx < 0 ? page < pageCount - 1 : page > 0
    const damped = dx * (hasTarget ? 0.14 : 0.05)
    listX.set(Math.max(-24, Math.min(24, damped)))
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    const wasHorizontal = gesture.current === 'horizontal'
    gesture.current = null
    if (!start || !wasHorizontal) {
      if (listX.get() !== 0) settleBack()
      return
    }
    const dx = event.changedTouches[0].clientX - start.x
    if (dx <= -48 && page < pageCount - 1) setPage(page + 1)
    else if (dx >= 48 && page > 0) setPage(page - 1)
    settleBack()
  }

  const hintPlayed = useRef(false)
  const hintInView = useInView(listRef, {
    once: true,
    margin: '0px 0px -20% 0px',
  })

  useEffect(() => {
    if (!hintInView || hintPlayed.current) return
    if (!isMobile || pageCount <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    hintPlayed.current = true
    animate(listX, -12, { delay: 1.4, duration: 0.7, ease: easeOutExpo }).then(
      () => {
        if (touchStart.current) return
        animate(listX, 0, {
          delay: 0.45,
          type: 'spring',
          stiffness: 160,
          damping: 30,
        })
      },
    )
  }, [hintInView, isMobile, pageCount, listX])

  return (
    <S.Section
      id='projects'
      variants={fade}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <S.Head>
        <SectionTitle>Projects</SectionTitle>
        {projects.length > pageSize && (
          <S.Pager>
            <S.PagerButton
              type='button'
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              aria-label='Previous projects'
            >
              <CaretLeftIcon size={13} />
            </S.PagerButton>
            <S.PageLabel>
              {page + 1} / {pageCount}
            </S.PageLabel>
            <S.PagerButton
              type='button'
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount - 1}
              aria-label='Next projects'
            >
              <CaretRightIcon size={13} />
            </S.PagerButton>
          </S.Pager>
        )}
      </S.Head>
      <S.ListViewport
        initial={false}
        animate={{ height: listHeight }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <S.ListInner ref={listRef} style={{ x: listX }}>
          <AnimatePresence mode='popLayout' initial={false}>
            <S.List
              key={page}
              variants={stagger}
              initial='hidden'
              animate='visible'
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {paged.map((project) => (
                <S.Item key={project.id} variants={fadeUp}>
                  <S.ItemButton
                    type='button'
                    onClick={() => onSelect(project.id)}
                  >
                    <S.Content
                      style={{ maskImage: textMask, WebkitMaskImage: textMask }}
                    >
                      <S.TitleRow>
                        <S.ItemTitle>
                          <SlidingText>
                            {project.title[lang]}
                            <S.Arrow aria-hidden='true'>
                              <ArrowRightIcon size='1em' />
                            </S.Arrow>
                          </SlidingText>
                        </S.ItemTitle>
                        <S.Year>{project.year}</S.Year>
                      </S.TitleRow>
                      <S.Summary>
                        <SlidingText>{project.summary[lang]}</SlidingText>
                      </S.Summary>
                      <S.TechStack>
                        <SlidingText>
                          {project.techStack.join(' · ')}
                        </SlidingText>
                      </S.TechStack>
                    </S.Content>
                    <S.Thumb>
                      <ImageSlot
                        image={project.image}
                        alt={project.title[lang]}
                        radius={0}
                        loading='lazy'
                      />
                    </S.Thumb>
                  </S.ItemButton>
                </S.Item>
              ))}
            </S.List>
          </AnimatePresence>
        </S.ListInner>
      </S.ListViewport>
    </S.Section>
  )
}
