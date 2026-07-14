'use client'

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import * as S from './SlidingText.styled'

interface SlidingTextProps {
  children: ReactNode
}

// 한 줄을 넘치는 텍스트를 좌우로 천천히 슬라이드하며 전체를 보여줍니다
export function SlidingText({ children }: SlidingTextProps) {
  const viewportRef = useRef<HTMLSpanElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const measure = () =>
      setSlide(Math.min(0, viewport.clientWidth - track.scrollWidth))
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  const sliding = slide < 0

  return (
    <S.Viewport
      ref={viewportRef}
      sliding={sliding}
      style={
        sliding
          ? ({
              '--slide': `${slide}px`,
              '--slide-duration': `${2 - slide / 30}s`,
            } as CSSProperties)
          : undefined
      }
    >
      <S.Track ref={trackRef} sliding={sliding}>
        {children}
      </S.Track>
    </S.Viewport>
  )
}
