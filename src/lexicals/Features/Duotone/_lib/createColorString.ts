import type { Theme } from '@payloadcms/ui'
import type { DuotoneKey, DuotoneThemedColor } from '../_types'

export const createColorString = (color: DuotoneKey, theme: Theme): DuotoneThemedColor =>
  color && color?.includes('-') ? (color as DuotoneThemedColor) : `${color ?? 'asphalt'}-${theme}`
