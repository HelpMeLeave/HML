import { placeholderField } from '@/_components/blocks/Form/_lib/placeholderField'
import { widthField } from '@/_components/blocks/Form/_lib/widthField'
import { rowField } from '@/collections/_fields/Flex'
import type { TextField } from 'payload'

export const rowWidthPlaceholder = (props?: Partial<TextField & { hasMany?: false }>) =>
  rowField({}, widthField, placeholderField(props))
