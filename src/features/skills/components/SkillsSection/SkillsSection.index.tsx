'use client'

import { CertificateIcon } from '@phosphor-icons/react'
import { certifications, otherSkills } from 'features/skills/api'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  AwardLightbox,
  type AwardViewer,
} from 'shared/components/AwardLightbox/AwardLightbox.index'
import { SectionTitle } from 'shared/components/SectionTitle/SectionTitle.index'
import type { Lang } from 'shared/i18n/strings'
import { fadeUp, viewportOnce } from 'shared/styles/motion'
import { asset } from 'shared/utils/asset'
import * as S from './SkillsSection.styled'

const SPEED = 32 // px per second
const EASE = 4 // higher = quicker deceleration/acceleration

function SkillGroup({ hidden }: { hidden?: boolean }) {
  return (
    <S.Group aria-hidden={hidden}>
      {otherSkills.map((skill) => (
        <S.SkillItem key={skill.name}>
          {skill.icon && (
            <S.SkillIcon src={asset(skill.icon)} alt='' loading='lazy' />
          )}
          {skill.name}
        </S.SkillItem>
      ))}
    </S.Group>
  )
}

function useMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let offset = 0
    let speed = 1
    let target = 1
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      speed += (target - speed) * Math.min(1, dt * EASE)
      offset += SPEED * speed * dt
      const half = track.scrollWidth / 2
      if (half > 0 && offset >= half) offset -= half
      track.style.transform = `translateX(${-offset}px)`
      raf = requestAnimationFrame(step)
    }
    let raf = requestAnimationFrame(step)

    const slow = () => {
      target = 0
    }
    const resume = () => {
      target = 1
    }
    const toggle = () => {
      target = target === 0 ? 1 : 0
    }

    // 마우스 환경은 호버로 감속, 터치 환경은 탭으로 정지/재생을 토글합니다
    const hoverCapable = window.matchMedia('(hover: hover)').matches
    if (hoverCapable) {
      track.addEventListener('mouseenter', slow)
      track.addEventListener('mouseleave', resume)
    } else {
      track.addEventListener('click', toggle)
    }

    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('mouseenter', slow)
      track.removeEventListener('mouseleave', resume)
      track.removeEventListener('click', toggle)
    }
  }, [])

  return trackRef
}

export function SkillsSection({ lang }: { lang: Lang }) {
  const trackRef = useMarquee()
  const [viewer, setViewer] = useState<AwardViewer | null>(null)

  return (
    <S.Section
      id='skills'
      variants={fadeUp}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <SectionTitle>Skills</SectionTitle>
      <S.Prose>
        {lang === 'en' ? (
          <S.Sentence>
            I mostly build with <strong>TypeScript</strong>,{' '}
            <strong>React</strong>, and <strong>Next.js</strong> styled with{' '}
            <strong>Emotion</strong>.
          </S.Sentence>
        ) : (
          <S.Sentence>
            주로 <strong>TypeScript</strong>와 <strong>React</strong>,{' '}
            <strong>Next.js</strong>, <strong>Emotion</strong>을 사용해요.
          </S.Sentence>
        )}
      </S.Prose>
      <S.Marquee>
        <S.Track ref={trackRef}>
          <SkillGroup />
          <SkillGroup hidden />
        </S.Track>
      </S.Marquee>
      <S.Certifications>
        <S.CertLabel>{lang === 'en' ? 'Certifications' : '자격증'}</S.CertLabel>
        {certifications.map((cert, index) => (
          <Fragment key={cert.en}>
            {index > 0 && ' · '}
            {cert.award ? (
              <S.CertButton
                type='button'
                onClick={() =>
                  setViewer({ images: [cert.award as string], alt: cert[lang] })
                }
              >
                {cert[lang]}
                <S.CertIcon aria-hidden='true'>
                  <CertificateIcon size='1em' />
                </S.CertIcon>
              </S.CertButton>
            ) : (
              cert[lang]
            )}
          </Fragment>
        ))}
      </S.Certifications>
      <AwardLightbox viewer={viewer} onClose={() => setViewer(null)} />
    </S.Section>
  )
}
