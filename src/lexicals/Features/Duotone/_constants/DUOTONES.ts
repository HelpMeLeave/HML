import { COLORS } from '@/lexicals/Features/Duotone/_constants/COLORS'
import { createColorString } from '@/lexicals/Features/Duotone/_lib/createColorString'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneKey, DuotonePreset, HexColor } from '@/lexicals/Features/Duotone/_types'
import { toTitleCase } from '@/lib/textCasing'
import type { Theme } from '@payloadcms/ui'

const THEME_KEYS: [Theme, Theme] = ['light', 'dark']

type HighlightShadowFnProps = {
  hex: Record<Theme, HexColor>
  theme: Theme
  type: 'highlight' | 'shadow'
}

export const DUOTONES = (Object.entries(COLORS) as [DuotoneKey, Record<Theme, HexColor>][]).flatMap(
  ([color, hex]) => {
    const highlightShadow = ({ hex, theme, type }: HighlightShadowFnProps): HexColor =>
      (
        [type == 'highlight', theme == 'light' || hex[theme] == COLORS.asphalt[theme]].every(
          Boolean
        )
      ) ?
        COLORS.paper[theme]
      : [type == 'shadow', theme == 'dark' || hex[theme] == COLORS.paper[theme]].every(Boolean) ?
        COLORS.asphalt[theme]
      : hex[theme]

    const createChip = ({ theme }: { theme: Theme }) =>
      theme == 'light' ?
        { bg: COLORS.asphalt[theme], text: COLORS.paper[theme] }
      : { bg: COLORS.paper[theme], text: COLORS.asphalt[theme] }

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
