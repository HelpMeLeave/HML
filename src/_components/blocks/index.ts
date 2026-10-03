import { ColumnsBlockConfig } from '@/_components/blocks/Columns'
import { CTABlockConfig } from '@/_components/blocks/CTA'
import { FormBlockConfig } from '@/_components/blocks/Form'
import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { RichTextConfig } from '@/_components/blocks/RichText'
import { TemplateBlockConfig } from '@/_components/blocks/Templates'
import { VideoPlayerBlockConfig } from '@/_components/blocks/VideoPlayer'
import { DynamicTextInlineBlockConfig } from '@/_components/inlineBlocks/DynamicText'
import type { Block } from 'payload'

export const blocks: Block[] = [
  RichTextConfig,
  VideoPlayerBlockConfig,
  CTABlockConfig,
  ColumnsBlockConfig,
  DynamicTextInlineBlockConfig,
  TemplateBlockConfig,
  PageGroupBlockConfig,
  FormBlockConfig,
]
