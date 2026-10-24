import { DUOTONE_TWEAKS } from '@/lexicals/Features/Duotone/_constants/DUOTONE_TWEAKS'
import type { DuotoneTweakFields } from '@/lexicals/Features/Duotone/_types'

export const TWEAK_KEYS = Object.keys(DUOTONE_TWEAKS) as (keyof DuotoneTweakFields)[]
