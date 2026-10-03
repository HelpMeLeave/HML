import type { FormField } from '@/_components/blocks/Form/types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Validator = ({ value }: { value: unknown }) => string | undefined

const required =
  (label = 'This field'): Validator =>
  ({ value }) => {
    if (value === '' || value === null || value === undefined) return `${label} is required`
    if (Array.isArray(value) && value.length === 0) return `${label} is required`
    return undefined
  }

export const buildValidators = (
  field: FormField
): { onChange?: Validator; onBlur?: Validator } | undefined => {
  if (field.blockType === 'formFieldMessage') return undefined

  const label = 'label' in field && field.label ? String(field.label) : 'This field'
  const isRequired = 'required' in field && field.required

  const onChange: Validator = ({ value }) => {
    if (isRequired) {
      const err = required(label)({ value })
      if (err) return err
    }

    if (field.blockType === 'formFieldEmail' && value && !EMAIL_RE.test(String(value))) {
      return 'Invalid email address'
    }

    if (field.blockType === 'formFieldNumber' && value !== '' && isNaN(Number(value))) {
      return 'Must be a number'
    }

    return undefined
  }

  return { onChange }
}
