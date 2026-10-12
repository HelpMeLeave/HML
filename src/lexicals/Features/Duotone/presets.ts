import { DUOTONES } from './_lib/DUOTONES'
import type { DuotoneThemed } from './_types'

export const getDuotonePreset = (value: unknown) => DUOTONES.find((p) => p.value === value)

export const duotoneFilterStyle = (value: DuotoneThemed) => getDuotonePreset(value)?.image

export const duotoneChipVars = (value: unknown) => {
  const chip = getDuotonePreset(value)?.chip

  return chip ?
      {
        '--chip-bg': chip.bg,
        ...(chip.text && { '--chip-text': chip.text }),
      }
    : undefined
}

export const isImageMime = (mime: unknown) => typeof mime == 'string' && mime.startsWith('image/')

/** The preset's own color end: the highlight on dark presets, the shadow on light ones. */
export const duotoneAccent = (value: unknown) => {
  const preset = getDuotonePreset(value)
  return preset && (preset.value.endsWith('-dark') ? preset.highlight : preset.shadow)
}
