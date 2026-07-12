'use client'

import { asset } from 'shared/utils/asset'
import * as S from './ImageSlot.styled'

interface ImageSlotProps {
  image?: string
  alt: string
  label?: string
  radius?: number
}

export function ImageSlot({ image, alt, label, radius = 8 }: ImageSlotProps) {
  if (image) return <S.Image src={asset(image)} alt={alt} radius={radius} />
  return <S.Placeholder radius={radius}>{label}</S.Placeholder>
}
