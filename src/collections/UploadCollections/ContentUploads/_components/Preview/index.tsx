'use client'

type _HERE = ToDo

import { useFormFields } from '@payloadcms/ui'
import Image from 'next/image'
import type { UIFieldClientProps } from 'payload'

const PreviewField = (props: UIFieldClientProps) => {
  const basePath = props.path.replace('.preview', '')
  const _color = basePath.replace(/^[a-z.]+\./, '')
  const fieldPath = (fieldName: string) => `${basePath}.${fieldName}`

  const {
    brightness: _brightness,
    contrast: _contrast,
    grayscale: _grayscale,
    imgUrl,
  } = useFormFields(([fields]) => ({
    brightness: fields[fieldPath('brightness')].value,
    contrast: fields[fieldPath('contrast')].value,
    grayscale: fields[fieldPath('grayscale')].value,
    imgUrl: fields.thumbnailURL.value,
  })) as {
    brightness: number
    contrast: number
    grayscale: number
    imgUrl: string
  }

  return (
    <Image
      overrideSrc={imgUrl}
      src={''}
      alt={''}
    />
  )
}

export default PreviewField
