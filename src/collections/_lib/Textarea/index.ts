import { tFn } from '@/_config/i18n/'
import type { TextareaFieldProps, ValidField } from '@/collections/_lib/Textarea/_types'
import type { TextareaField } from 'payload'

const TextareaCellPath = '@/collections/_lib/Textarea/Cell'

export const TextareaConfig = (name: string, options?: TextareaFieldProps): TextareaField => {
  const { description, width, admin, condition, label, tLabel, readOnly, ...otherOpts } =
    options ?? {}

  const field = {
    ...otherOpts,
    name,
    type: 'textarea',
    label: tLabel ? tFn(tLabel) : label,
    admin: {
      ...admin,
      width: width ?? admin?.width,
      readOnly: readOnly ?? admin?.readOnly,
      condition: condition ?? admin?.condition,
      description: description ?? admin?.description,
      components: {
        Cell: TextareaCellPath,
        ...admin?.components,
      },
    },
  } as ValidField

  return field
}

export const DescriptionField = (
  options: Partial<Omit<TextareaField, 'type'>> = {}
): TextareaField => ({
  name: 'description',
  label: 'Description',
  ...options,
  type: 'textarea',
})

export const TitleField = (options: Partial<Omit<TextareaField, 'type'>> = {}): TextareaField =>
  TextareaConfig('title', {
    ...options,
    label: 'Title',
  })
