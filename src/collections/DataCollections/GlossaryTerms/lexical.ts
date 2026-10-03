import { paragraphRichText } from '@/_components/lexicals/nested'
import { columnField } from '@/collections/_fields/Flex'
import { LinkFeature } from '@payloadcms/richtext-lexical'
import type { CheckboxField, Field, RadioField } from 'payload'
import { fieldAffectsData } from 'payload/shared'

const LexicalDefinitionFeature = LinkFeature({
  fields: ({ defaultFields }) => {
    const baseFields = defaultFields
      .map((field) => {
        if (!fieldAffectsData(field)) return field
        switch (field.name) {
          case 'newTab':
            return {
              ...field,
              defaultValue: false,
              admin: {
                hidden: true,
              },
            } as CheckboxField
          case 'linkType':
            return {
              ...field,
              defaultValue: 'internal',
              admin: {
                hidden: true,
              },
            } as RadioField
          default:
            return field
        }
      })
      .filter(Boolean) as Field[]

    return [columnField({}, ...baseFields)]
  },
  enabledCollections: ['glossary-term', 'glossary-term-country'],
  disableAutoLinks: true,
})

export const glossaryLexical = paragraphRichText([LexicalDefinitionFeature])
