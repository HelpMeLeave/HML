import {
  ButtonModalBlockConfig,
  ButtonOpenModalBlockConfig,
} from '@/_components/blocks/Button/modal'
import { ColumnsBlockConfig, CTABlockConfig, VideoPlayerBlockConfig } from '@/_config/Blocks'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ModalBlockConfig: Block = {
  slug: 'modal',
  interfaceName: 'ModalBlock',
  fields: [
    {
      type: 'blocks',
      name: 'openButton',
      blocks: [ButtonOpenModalBlockConfig],
      admin: {
        ...listDisabled,
      },
      minRows: 1,
      maxRows: 1,
      required: true,
    },
    {
      type: 'array',
      name: 'pages',
      fields: [
        {
          type: 'text',
          name: 'slug',
          required: true,
        },
        {
          type: 'richText',
          editor: lexicalEditor({
            admin: {
              placeholder: 'Start typing...',
              hideGutter: true,
            },
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              BlocksFeature({
                blocks: [
                  CTABlockConfig,
                  ColumnsBlockConfig,
                  ButtonModalBlockConfig,
                  VideoPlayerBlockConfig,
                ],
              }),
            ],
          }),
          name: 'content',
        },
      ],
    },
  ],
}
