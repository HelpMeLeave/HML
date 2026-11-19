import type { EntryProps } from '@/lib/convertColors/_types'

const calc = (c: number): number => {
  const corrected = c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c
  return Math.round(Math.min(Math.max(0, corrected), 1) * 255)
}

export const toSrgb = {
  fromLinearRGB: ({ r, g, bl }: EntryProps['LinearRGB']) => ({
    r: calc(r),
    g: calc(g),
    b: calc(bl),
  }),
}
