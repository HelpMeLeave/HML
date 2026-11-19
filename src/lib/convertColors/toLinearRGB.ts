import type { EntryProps } from '@/lib/convertColors/_types'
import { toXYZ } from '@/lib/convertColors/toXYZ'

export const toLinearRGB = {
  fromXYZ: ({ x, y, z }: EntryProps['XYZ']) => {
    x /= 100
    y /= 100
    z /= 100

    return {
      r: x * 3.2406 + y * -1.5372 + z * -0.4986,
      g: x * -0.9689 + y * 1.8758 + z * 0.0415,
      bl: x * 0.0557 + y * -0.204 + z * 1.057,
    }
  },
  fromLAB: function ({ l, a, b }: EntryProps['LAB']) {
    return this.fromXYZ(toXYZ.fromLAB({ l, a, b }))
  },
}
