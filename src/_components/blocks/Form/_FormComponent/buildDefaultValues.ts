import type { FormField } from '@/_components/blocks/Form/types'

export const buildDefaultValues = (fields: FormField[]): Record<string, unknown> => {
  const defaults: Record<string, unknown> = {}

  for (const field of fields) {
    if ('fields' in field && field.fields) {
      Object.entries(buildDefaultValues(field.fields)).forEach(([childKey, childValue]) => {
        defaults[childKey] = childValue
      })
    }
    if (field.blockType === 'formFieldMessage') continue

    const name = 'name' in field ? field.name : null
    if (!name) continue

    switch (field.blockType) {
      case 'formFieldCheckbox':
        defaults[name] = field.defaultValue ?? false
        break
      case 'formFieldPronouns':
        defaults[name] = []
        break
      default:
        defaults[name] = 'defaultValue' in field ? (field.defaultValue ?? '') : ''
    }
  }

  return defaults
}
