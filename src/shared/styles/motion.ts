import type { Variants } from 'framer-motion'

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* 빠르게 올라온 뒤 끝에서 길게 감속하는 expo-out 커브 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const viewportOnce = { once: true, margin: '0px 0px -60px' } as const
