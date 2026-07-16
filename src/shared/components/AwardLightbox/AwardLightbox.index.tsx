'use client'

import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, type PanInfo } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  lockScroll,
  unlockScroll,
} from 'shared/components/SmoothScroll/SmoothScroll.index'
import { easeOutExpo } from 'shared/styles/motion'
import { asset } from 'shared/utils/asset'
import * as S from './AwardLightbox.styled'

export interface AwardViewer {
  images: string[]
  alt: string
}

interface AwardLightboxProps {
  viewer: AwardViewer | null
  onClose: () => void
}

const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 400

function Overlay({
  viewer,
  onClose,
}: {
  viewer: AwardViewer
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const loadedSrcs = useRef(new Set<string>())
  const [, bumpLoaded] = useState(0)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const count = viewer.images.length
  const src = asset(viewer.images[index])
  const loaded = loadedSrcs.current.has(src)

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)
  // UI로 닫을 때도 뒤로가기로 닫힌 것과 같은 경로를 타도록 히스토리만 되돌립니다
  const close = () => history.back()

  useEffect(() => {
    lockScroll()
    // 모바일 시스템 뒤로가기가 페이지 이탈 대신 라이트박스를 닫도록 항목을 쌓습니다
    history.pushState({ awardLightbox: true }, '')
    const onPopState = () => onCloseRef.current()
    window.addEventListener('popstate', onPopState)

    const previousFocus = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => {
      unlockScroll()
      window.removeEventListener('popstate', onPopState)
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    // 페이징이 즉시 뜨도록 나머지 이미지를 미리 받아 둡니다
    for (const image of viewer.images) {
      const img = new window.Image()
      img.src = asset(image)
    }
  }, [viewer])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') history.back()
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
      if (event.key === 'Tab') {
        // 다이얼로그 밖으로 포커스가 새지 않도록 버튼 사이에서 순환시킵니다
        const focusables =
          backdropRef.current?.querySelectorAll<HTMLElement>('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement
        if (event.shiftKey && (active === first || active === document.body)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next()
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) prev()
  }

  return (
    <S.Backdrop
      ref={backdropRef}
      role='dialog'
      aria-modal='true'
      aria-label={viewer.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={close}
    >
      <S.CloseButton
        ref={closeButtonRef}
        type='button'
        aria-label='Close'
        onClick={(event) => {
          event.stopPropagation()
          close()
        }}
      >
        <XIcon size='1em' />
      </S.CloseButton>
      <S.Figure
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        onClick={(event) => event.stopPropagation()}
      >
        <S.ImageFrame
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={count > 1 ? onDragEnd : undefined}
        >
          {!loaded && <S.Spinner aria-hidden='true' />}
          <S.Image
            key={src}
            src={src}
            alt={viewer.alt}
            loaded={loaded}
            decoding='async'
            draggable={false}
            onLoad={() => {
              loadedSrcs.current.add(src)
              bumpLoaded((n) => n + 1)
            }}
          />
        </S.ImageFrame>
        {count > 1 && (
          <>
            <S.NavButton
              type='button'
              side='left'
              aria-label='Previous'
              onClick={prev}
            >
              <CaretLeftIcon size='1em' />
            </S.NavButton>
            <S.NavButton
              type='button'
              side='right'
              aria-label='Next'
              onClick={next}
            >
              <CaretRightIcon size='1em' />
            </S.NavButton>
            <S.Counter>
              {index + 1} / {count}
            </S.Counter>
          </>
        )}
      </S.Figure>
    </S.Backdrop>
  )
}

export function AwardLightbox({ viewer, onClose }: AwardLightboxProps) {
  return (
    <AnimatePresence>
      {viewer && <Overlay viewer={viewer} onClose={onClose} />}
    </AnimatePresence>
  )
}
