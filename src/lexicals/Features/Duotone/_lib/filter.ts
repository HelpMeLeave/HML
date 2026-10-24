import { DUOTONE_TWEAKS } from '../_constants/DUOTONE_TWEAKS'
import type { DuotoneThemedColor, DuotoneTweakFields } from '../_types'

export const duotoneFilter = (color: DuotoneThemedColor, tweaks?: Nullish<DuotoneTweakFields>) => {
  const pct = (tweaks?: Nullish<DuotoneTweakFields>) => ({
    brightness: `brightness(${tweaks?.brightness ?? DUOTONE_TWEAKS.brightness}%)`,
    contrast: `contrast(${tweaks?.contrast ?? DUOTONE_TWEAKS.contrast}%)`,
    grayscale: `grayscale(${tweaks?.grayscale ?? DUOTONE_TWEAKS.grayscale}%)`,
  })

  const { brightness, contrast, grayscale } = pct(tweaks)
  if (color.includes('-dark')) {
    return [contrast, brightness, `url(#duotone-${color})`, grayscale, 'contrast(1.4)'].join(' ')
  }

  return [contrast, brightness, 'saturate(0.8)', grayscale, `url(#duotone-${color})`].join(' ')
}
