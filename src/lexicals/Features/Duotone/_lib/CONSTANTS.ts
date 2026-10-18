import { createColorString } from '@/lexicals/Features/Duotone/_lib/createColorString'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type {
  DuotoneColor,
  DuotoneKey,
  DuotonePosition,
  DuotonePreset,
  DuotoneTweakFields,
  HexColor,
} from '@/lexicals/Features/Duotone/_types'
import { toTitleCase } from '@/lib/textCasing'
import type { Theme } from '@payloadcms/ui'

export const COLORS: DuotoneColor = {
  asphalt: {
    light: '#292a27',
    dark: '#292a27',
  },
  pine: {
    light: '#285a3d',
    dark: '#285a3d',
  },
  sun: {
    light: '#d9a83a',
    dark: '#d9a83a',
  },
  poppy: {
    light: '#d7653e',
    dark: '#b9654d',
  },
  sky: {
    light: '#a9c9c8',
    dark: '#527a76',
  },
  paper: {
    light: '#faf8f5',
    dark: '#faf8f5',
  },
  limestone: {
    light: '#e8e2db',
    dark: '#e8e2db',
  },
  violet: {
    light: '#b991af',
    dark: '#b991af',
  },
}

export const THEME_KEYS: [Theme, Theme] = ['light', 'dark']

export const DUOTONE_TWEAKS: DuotoneTweakFields = { brightness: 100, contrast: 200, grayscale: 100 }
export const TWEAK_MAX: DuotoneTweakFields = {
  brightness: 200,
  contrast: 400,
  grayscale: 100,
}

export const TWEAK_KEYS = Object.keys(DUOTONE_TWEAKS) as (keyof DuotoneTweakFields)[]

export const POSITIONS = (['top', 'middle', 'bottom'] as const).flatMap((y) =>
  (['left', 'center', 'right'] as const).map((x): DuotonePosition => `${y} ${x}`)
)

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
