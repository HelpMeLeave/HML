import { getDuotonePreset } from '@/lexicals/Features/Duotone/_lib/getDuotonePreset'

export const duotoneChipVars = (value: unknown) => {
  const chip = getDuotonePreset(value)?.chip

  return chip ?
      {
        '--chip-bg': chip.bg,
        ...(chip.text && { '--chip-text': chip.text }),
      }
    : undefined
}
