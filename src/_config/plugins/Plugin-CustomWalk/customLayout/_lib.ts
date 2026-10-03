import type { Field } from 'payload'

export const typeWidth = (field: Field, inSidebar: boolean) => {
  if (inSidebar) {
    return '100%'
  }
  switch (field.type) {
    case 'text':
    case 'number':
      return '200px'
    case 'select':
    case 'relationship':
    case 'checkbox':
    case 'radio':
      return '300px'
    case 'textarea':
      return '50%'
    default:
      return undefined
  }
}
