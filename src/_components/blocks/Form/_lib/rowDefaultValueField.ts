import { defaultValueField } from '@/_components/blocks/Form/_lib/defaultValueField'
import { rowField } from '@/collections/_fields/Flex'

export const rowDefaultValueField = (type: keyof typeof defaultValueField) =>
  rowField({}, defaultValueField[type])
