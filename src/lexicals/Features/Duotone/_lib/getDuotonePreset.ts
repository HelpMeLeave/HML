import { DUOTONES } from '@/lexicals/Features/Duotone/_lib/CONSTANTS'

export const getDuotonePreset = (value: unknown) => DUOTONES.find((p) => p.value === value)
