import { DUOTONES } from '../_constants/DUOTONES'

export const getDuotonePreset = (value: unknown) => DUOTONES.find((p) => p.value === value)
