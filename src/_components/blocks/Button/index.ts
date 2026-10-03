import { inlineRichText } from '@/_components/lexicals/inline'
import { normalizeSelectOptions } from '@/lib/normalize'
import type { Field } from 'payload'

export const baseFields: Field[] = [
  {
    type: 'select',
    name: 'style',
    options: normalizeSelectOptions('primary', 'secondary', 'ghost'),
  },
  {
    type: 'richText',
    editor: inlineRichText,
    name: 'content',
  },
]
