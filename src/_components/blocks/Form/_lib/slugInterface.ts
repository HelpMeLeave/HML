import { toTitleCase } from '@/lib/textCasing'

export const slugInterface = (field: string) => ({
  slug: `formField${toTitleCase(field).replace(' ', '')}`,
  interfaceName: `FormField${toTitleCase(field).replace(' ', '')}`,
})
