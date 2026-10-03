import { tFn } from '@/_config/i18n/'
import { EmailCellPath, EmailFieldPath } from '@/collections/_lib/Email'
import type { TextFieldProps, ValidField } from '@/collections/_lib/Text/_types'
import type { TextareaField, TextField } from 'payload'

const TextCellPath = '@/collections/_lib/Text/Cell'

export const TextConfig = (name: string, options?: TextFieldProps): TextField => {
  const { description, admin, condition, textType, label, tLabel, readOnly, ...otherOpts } =
    options ?? {}

  const field = {
    ...otherOpts,
    name,
    type: 'text',
    label: tLabel ? tFn(tLabel) : label,
    admin: {
      ...admin,
      readOnly: readOnly ?? admin?.readOnly,
      condition: condition ?? admin?.condition,
      description: description ?? admin?.description,
      components: {
        ...admin?.components,
      },
    },
  } as ValidField

  if (Boolean(admin?.components?.Cell) == false) {
    switch (textType) {
      case 'mail':
        field.admin.components.Cell = EmailCellPath
        field.admin.components.Field = EmailFieldPath
        break
      case 'abbreviation':
        field.admin.components.Cell = {
          path: TextCellPath,
          clientProps: { className: 'narrow' },
          serverProps: { className: 'narrow' },
        }
        break
      default:
        field.admin.components.Cell = TextCellPath
    }
  }

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

export const TitleField = (
  options: Partial<Omit<Exclude<TextField, { hasMany: true }>, 'type'>> = {}
): TextField =>
  TextConfig('title', {
    ...options,
    label: 'Title',
  })
