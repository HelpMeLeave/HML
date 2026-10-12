import type { Theme } from '@payloadcms/ui'
import type { DuotoneKey, DuotoneThemed } from '../_types'

export const createColorString = (color: DuotoneKey, theme: Theme): DuotoneThemed =>
  color && color?.includes('-') ? (color as DuotoneThemed) : `${color ?? 'asphalt'}-${theme}`
