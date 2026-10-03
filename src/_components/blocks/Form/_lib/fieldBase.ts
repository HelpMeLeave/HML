import { fieldLabels } from '@/_components/blocks/Form/_lib/fieldLabels'
import { slugInterface } from '@/_components/blocks/Form/_lib/slugInterface'

export const fieldBase = (field: string) => ({
  ...slugInterface(field),
  labels: fieldLabels(field),
})
