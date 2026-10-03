import { labelField } from '@/_components/blocks/Form/_lib/labelField'
import { nameField } from '@/_components/blocks/Form/_lib/nameField'
import { rowField } from '@/collections/_fields/Flex'

export const rowNameLabel = rowField({}, nameField(), labelField())
