import type { Field, Tab } from 'payload'

export const TabCredit = (
  baseFields: {
    photographerField: boolean
    authorField: boolean
  } = {
    photographerField: true,
    authorField: true,
  },
  ...otherFields: Field[]
): Tab => {
  const { photographerField, authorField } = baseFields
  const fields: Field[] = []
  photographerField !== false
    && fields.push(
      {
        name: 'photographer',
        type: 'text',
      },
      {
        name: 'link',
        type: 'text',
      }
    )

  authorField !== false
    && fields.push({
      type: 'array',
      name: 'authors',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    })

  return {
    label: 'Credits',
    name: 'credits',
    fields: [...fields, ...otherFields],
  }
}
