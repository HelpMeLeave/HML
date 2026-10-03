import { FieldButton } from '@/_components/blocks/CTA/Button'
import { editorParagraphRichText } from '@/_components/lexicals/nested'
import { rowField } from '@/collections/_fields/Flex'
import { templateFields } from '@/collections/_fields/templateFields'
import { cn } from '@/lib/cn'
import { conditionFnBlock } from '@/lib/condition'
import type { Block } from 'payload'

const fieldBtnClassBase =
  'grow max-w-full! **:[--field-width:100%] field:field-render:gap-4! field:field-render:pl-6 field-label:text-lg! px-0!'

export const CTABlockConfig: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  admin: {
    disableBlockName: true,
    images: {
      icon: {
        url: '/lexicalIcons/pageGroup.svg',
        alt: 'Call to Action Block',
      },
    },
  },
  fields: [
    ...templateFields({
      templateType: 'Call to Action',
      switchComponent: '@/_components/blocks/CTA/Template',
    }),
    rowField(
      {},
      {
        name: 'title',
        type: 'richText',
        required: true,
        custom: {
          layout: {
            labelSize: 'large',
          },
        },
        editor: editorParagraphRichText,
        admin: {
          className: 'richtext-editor:py-0',
          condition: conditionFnBlock({ key: 'useTemplate' }).siblingDataFalsy,
        },
      },
      {
        name: 'subtitle',
        type: 'richText',
        editor: editorParagraphRichText,
        admin: {
          className: 'richtext-editor:py-0',
          condition: conditionFnBlock({ key: 'useTemplate' }).siblingDataFalsy,
        },
      }
    ),
    rowField(
      {},
      FieldButton({
        name: 'primaryButton',
        withActions: true,
        admin: {
          className: cn('cta-primaryBtn', fieldBtnClassBase),
          hideGutter: true,
          condition: conditionFnBlock({ key: 'useTemplate' }).siblingDataFalsy,
        },
      }),
      FieldButton({
        required: false,
        name: 'secondaryButton',
        admin: {
          className: cn('cta-secondaryBtn', fieldBtnClassBase),
          hideGutter: true,
          condition: conditionFnBlock({ key: 'useTemplate' }).siblingDataFalsy,
        },
      })
    ),
  ],
}
