import { toTitleCase } from '@/lib/textCasing'
import type { Theme } from '@payloadcms/ui'
import type { DuotoneKey, DuotonePreset, HexColor } from '../_types'
import { COLORS } from './COLORS'
import { createColorString } from './createColorString'
import { duotoneFilter } from './filter'

const THEME_KEYS = ['light', 'dark'] as Theme[]

const createChip = ({ theme }: { theme: Theme }) => {
  return theme == 'light' ?
      { bg: COLORS.asphalt[theme], text: COLORS.paper[theme] }
    : { bg: COLORS.paper[theme], text: COLORS.asphalt[theme] }
}

type HighlightShadowFnProps = {
  hex: Record<Theme, HexColor>
  theme: Theme
  type: 'highlight' | 'shadow'
}
/** When the preset color is the fixed end itself (asphalt-dark, paper-light), the other neutral takes its place so the duotone isn't a flat fill. */
const highlightShadow = ({ hex, theme, type }: HighlightShadowFnProps): HexColor => {
  const { asphalt, paper } = COLORS
  if (type == 'highlight') {
    if (theme == 'light') return paper[theme]
    return hex[theme] == asphalt[theme] ? paper[theme] : hex[theme]
  }
  if (theme == 'dark') return asphalt[theme]
  return hex[theme] == paper[theme] ? asphalt[theme] : hex[theme]
}

export const DUOTONES = (Object.entries(COLORS) as [DuotoneKey, Record<Theme, HexColor>][]).flatMap(
  ([color, hex]) => {
    return THEME_KEYS.map((theme) => {
      const valString = createColorString(color, theme)

      return {
        value: valString,
        label: toTitleCase(valString.replaceAll(/-(.+)/g, ' ($1)')),
        chip: createChip({ theme }),
        image: duotoneFilter(valString),
        highlight: highlightShadow({ hex, theme, type: 'highlight' }),
        shadow: highlightShadow({ hex, theme, type: 'shadow' }),
      }
    }).filter(Boolean) as DuotonePreset[]
  }
)
