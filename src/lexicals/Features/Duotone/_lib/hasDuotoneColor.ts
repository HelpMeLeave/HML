import type { DuotoneFields } from '@/lexicals/Features/Duotone/_types'

type HasDuotoneColorProps = {
  duotone?: {
    color?: DuotoneFields['duotone']['color'] | null
  } | null
}

export const hasDuotoneColor = (field?: HasDuotoneColorProps | null): field is DuotoneFields =>
  Boolean(field?.duotone?.color)
