import type { DuotoneThemed } from '../_types'

/** Per-use tweak defaults, in percent. */
export const DUOTONE_TWEAKS = { brightness: 100, contrast: 200, grayscale: 100 }

export type DuotoneTweaks = Partial<Record<keyof typeof DUOTONE_TWEAKS, number | null>>

/** CSS filter for a duotone preset, with any per-use tweaks applied over the defaults. */
export const duotoneFilter = (color: DuotoneThemed, tweaks?: DuotoneTweaks | null) => {
  const pct = (key: keyof typeof DUOTONE_TWEAKS) => `${tweaks?.[key] ?? DUOTONE_TWEAKS[key]}%`
  return `contrast(${pct('contrast')}) brightness(${pct('brightness')}) saturate(0.8) grayscale(${pct('grayscale')}) url(#duotone-${color})`
}
