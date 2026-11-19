import type { EntryProps } from '@/lib/convertColors/_types'
import { toLinearRGB } from '@/lib/convertColors/toLinearRGB'
import { toSrgb } from '@/lib/convertColors/toSrgb'

export const toHex = {
  // #region ! ---------- SRGB ----------
  fromSRGB: ({ r, g, b, a = 1 }: EntryProps['RGB']) => {
    const calc = (val: number): string => val.toString(16).padStart(2, '0')

    const clampAlpha = (a: number) => {
      const opacityValue = Math.min(Math.max(0, a), 1)
      return String(opacityValue < 1 ? calc(Math.round(opacityValue * 255)) : '')
    }

    return `#${calc(r)}${calc(g)}${calc(b)}${clampAlpha(a)}`
  },
  // #endregion ! --------------------
  fromLinearRGB: function ({ r, g, bl, alpha = 1 }: EntryProps['LinearRGB']) {
    return this.fromSRGB({ ...toSrgb.fromLinearRGB({ r, g, bl }), a: alpha })
  },
  fromLab: function ({ l, a, b, alpha = 1 }: EntryProps['LAB']) {
    return this.fromLinearRGB({ ...toLinearRGB.fromLAB({ l, a, b }), alpha })
  },
}

/**
 * Converts CIELAB (L*a*b*) and optional Alpha values to a 6- or 8-digit Hex string.
 */
export function labToHex({ l, a, b, alpha = 1 }: EntryProps['LAB']): string {
  const { r, g, bl } = toLinearRGB.fromLAB({ l, a, b })
  return toHex.fromSRGB({ ...toSrgb.fromLinearRGB({ r, g, bl }), a: alpha })
}
