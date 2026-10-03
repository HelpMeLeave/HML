import { requiredField } from '@/_components/blocks/Form/_lib/requiredField'
import { columnField } from '@/collections/_fields/Flex'
import { toArray } from '@/lib/normalize/to'
import type { Field } from 'payload'

export const fieldColWithRequired = (...fields: Field[]): Field[] => [
  columnField({}, requiredField(), ...toArray(fields)),
]
