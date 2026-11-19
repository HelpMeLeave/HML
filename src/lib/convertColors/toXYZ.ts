import type { EntryProps } from '@/lib/convertColors/_types'

export const toXYZ = {
  fromLAB: ({ l, a, b }: EntryProps['LAB']) => {
    let y = (l + 16) / 116
    let x = a / 500 + y
    let z = y - b / 200

    const x3 = x * x * x
    const y3 = y * y * y
    const z3 = z * z * z

    x = (x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787) * 95.047
    y = (y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787) * 100.0
    z = (z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787) * 108.883

    return { x, y, z }
  },
}
