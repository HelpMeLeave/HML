import { isOffSite } from '@/lib/normalize/resolveLink'
import { LinkFeature } from '@payloadcms/richtext-lexical'
import type { CheckboxField, RadioField } from 'payload'
import { fieldAffectsData } from 'payload/shared'

export const LexicalLinkFeature = LinkFeature({
  fields: ({ defaultFields }) => {
    const baseFields = defaultFields.map((field) => {
      if (!fieldAffectsData(field)) return field
      switch (field.name) {
        case 'newTab':
          return {
            ...field,
            defaultValue: false,
            hooks: {
              afterRead: [
                ({ siblingData, value }) =>
                  isOffSite(siblingData.url as string | null) ? true : value,
              ],
            },
          } as CheckboxField
        case 'linkType':
          return {
            ...field,
            defaultValue: 'custom',
            options: (field as RadioField).options.map((opt) =>
              typeof opt === 'object' && 'value' in opt && opt.value === 'external' ?
                { ...opt, label: 'External Link', value: 'custom' }
              : opt
            ),
          } as RadioField
        default:
          return field
      }
    })

    baseFields.push({
      type: 'text',
      name: 'docUrl',
      virtual: 'doc.url',
    })

    return baseFields
  },
  enabledCollections: ['routes', 'externalResources', 'documents'],
})
