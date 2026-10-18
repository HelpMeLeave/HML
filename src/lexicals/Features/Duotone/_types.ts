import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { Theme } from '@payloadcms/ui'

export type HexColor = `#${string}`

export type DuotoneColor = Record<DuotoneKey, Record<Theme, HexColor>>
export type DuotoneKey =
  'asphalt' | 'pine' | 'sun' | 'poppy' | 'sky' | 'paper' | 'limestone' | 'violet'

export type DuotonePreset = {
  value: DuotoneThemedColor
  label: string
  chip: { bg: HexColor; text: HexColor }
  image: string
  shadow: HexColor
  highlight: HexColor
}

export type DuotoneThemedColor = `${DuotoneKey}-${Theme}`

export type DuotonePosition = `${'top' | 'middle' | 'bottom'} ${'left' | 'center' | 'right'}`

export type DuotoneTweakFields = { brightness: number; contrast: number; grayscale: number }
type DuotoneBaseFields = {
  color: DuotoneThemedColor
  position: DuotonePosition
}
export type DuotoneFields = Record<'duotone', DuotoneBaseFields & DuotoneTweakFields>

export type CoverUpload = SerializedUploadNode & {
  value: { url?: string | null; mimeType?: string | null } | number | string
  fields?: Optional<Pick<DuotoneFields, 'duotone'>, 'duotone'>
}
