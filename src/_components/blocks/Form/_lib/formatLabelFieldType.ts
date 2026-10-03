import { toTitleCase } from '@/lib/textCasing'

export const formatLabelFieldType = (fieldType: string) =>
  toTitleCase(fieldType?.replace(/formfield/gi, '').replace(/([a-z])([A-Z])/g, '$1 $2'))
