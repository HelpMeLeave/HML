import type { CoverUpload } from '@/lexicals/Features/Duotone/_types'

export const isUpload = (field: CoverUpload | undefined): field is CoverUpload =>
  Boolean(field && field.type == 'upload' && field.value)
