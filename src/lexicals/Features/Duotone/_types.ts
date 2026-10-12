import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { Theme } from '@payloadcms/ui'
import type { DuotoneTweaks } from './_lib/filter'

export type DuotoneTheme = 'light' | 'dark'
export type HexColor = `#${string}`

export type DuotoneColor = {
  asphalt: { light: '#292a27'; dark: '#292a27' }
  pine: { light: '#285a3d'; dark: '#285a3d' }
  sun: { light: '#d9a83a'; dark: '#d9a83a' }
  poppy: { light: '#d7653e'; dark: '#b9654d' }
  sky: { light: '#a9c9c8'; dark: '#527a76' }
  paper: { light: '#faf8f5'; dark: '#faf8f5' }
  limestone: { light: '#e8e2db'; dark: '#e8e2db' }
  violet: { light: '#b991af'; dark: '#b991af' }
}

export type DuotoneKey = {
  [Key in keyof DuotoneColor]: Key
}[keyof DuotoneColor]

export type DuotonePreset = {
  value: DuotoneThemed
  label: string
  chip: { bg: HexColor; text: HexColor }
  image: string
  shadow: HexColor
  highlight: HexColor
}

export type DuotoneThemed = `${DuotoneKey}-${Theme}`

export type DuotonePosition = `${'top' | 'middle' | 'bottom'} ${'left' | 'center' | 'right'}`

export type DuotoneFields = {
  duotone: {
    color: DuotoneThemed
    position: DuotonePosition
  } & DuotoneTweaks
}

export type CoverUpload = SerializedUploadNode & {
  value: { url?: string | null; mimeType?: string | null } | number | string
  fields?: {
    duotone?: DuotoneFields['duotone']
  }
}
