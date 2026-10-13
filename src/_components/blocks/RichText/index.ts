import { ColumnsBlockConfig } from '@/_components/blocks/Columns'
import { CTABlockConfig } from '@/_components/blocks/CTA'
import { FormBlockConfig } from '@/_components/blocks/Form'
import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { TemplateBlockConfig } from '@/_components/blocks/Templates'
import { VideoPlayerBlockConfig } from '@/_components/blocks/VideoPlayer'
import { contentEditor } from '@/lexicals/editors'
import type { Block } from 'payload'

export const RichTextConfig: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: false,
      required: true,
      editor: contentEditor({
        blocks: [
          ColumnsBlockConfig,
          CTABlockConfig,
          FormBlockConfig,
          PageGroupBlockConfig,
          TemplateBlockConfig,
          VideoPlayerBlockConfig,
        ],
      }),
    },
  ],
}
