import type { DuotonePosition } from '@/lexicals/Features/Duotone/_types'

export const POSITIONS = (['top', 'middle', 'bottom'] as const).flatMap((y) =>
  (['left', 'center', 'right'] as const).map((x): DuotonePosition => `${y} ${x}`)
)
