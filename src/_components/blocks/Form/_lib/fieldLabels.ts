import { toTitleCase } from '@/lib/textCasing'

export const fieldLabels = (field: string) => ({
  plural: toTitleCase(`${field} Field`),
  singular: toTitleCase(`${field}`),
})
