import { getDuotonePreset } from '@/lexicals/Features/Duotone/_lib/getDuotonePreset'
import type { DuotoneThemedColor } from '@/lexicals/Features/Duotone/_types'
import { DUOTONES } from '../_constants/DUOTONES'
import { duotoneChipVars } from './duotoneChipVars'

const duotoneFilterStyle = (value: DuotoneThemedColor) => getDuotonePreset(value)?.image

export const editorCSS = DUOTONES.map(({ value }) => {
  const upload = `.lexical-upload[data-duotone='${value}']`

  const chip = Object.entries(duotoneChipVars(value) ?? {})
    .map(([k, v]) => `${k}:${v}`)
    .join(';')

  return (
    `${upload} img{filter:var(--duotone-filter,${duotoneFilterStyle(value)})}`
    + (chip && `:has(> ${upload}:first-of-type){${chip}}`)
  )
}).join('')
