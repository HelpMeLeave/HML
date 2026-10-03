import {
  ButtonModalBlockConfig,
  ButtonOpenModalBlockConfig,
} from '@/_components/blocks/Button/modal'
import {
  baseHeadingFeatures,
  baseListFeatures,
  baseMiscFeatures,
  baseParagraphFeatures,
  baseTextFeatures,
  baseUploadFeature,
  fixedToolbar,
  inlineToolbar,
} from '@/_components/lexicals/options'
import { ColumnsBlockConfig, CTABlockConfig, VideoPlayerBlockConfig } from '@/_config/Blocks'
import { cn } from '@/lib/cn'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import {
  BlocksFeature,
  defaultEditorLexicalConfig,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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
            features: () => [
              fixedToolbar,
              inlineToolbar,
              baseUploadFeature,
              ...baseTextFeatures,
              ...baseParagraphFeatures,
              ...baseListFeatures,
              ...baseHeadingFeatures,
              ...baseMiscFeatures,
              BlocksFeature({
                blocks: [
                  CTABlockConfig,
                  ColumnsBlockConfig,
                  ButtonModalBlockConfig,
                  VideoPlayerBlockConfig,
                ],
              }),
            ],
            lexical: {
              theme: {
                ...defaultEditorLexicalConfig.theme,
                root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
              },
              namespace: `rich-editor`,
            },
          }),
          name: 'content',
        },
      ],
    },
  ],
}
