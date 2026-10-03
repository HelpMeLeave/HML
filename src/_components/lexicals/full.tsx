import { ColumnsBlockConfig } from '@/_components/blocks/Columns'
import { CTABlockConfig } from '@/_components/blocks/CTA'
import { FormBlockConfig } from '@/_components/blocks/Form'
import { ModalBlockConfig } from '@/_components/blocks/Modal'
import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { QuoteBlockConfig } from '@/_components/blocks/Quote'
import { TemplateBlockConfig } from '@/_components/blocks/Templates'
import { VideoPlayerBlockConfig } from '@/_components/blocks/VideoPlayer'
import { DynamicTextInlineBlockConfig } from '@/_components/inlineBlocks/DynamicText'
import { DefinitionsFeature } from '@/_components/lexicals/Features/DefinitionsFeature'
import {
  baseAdmin,
  baseHeadingFeatures,
  baseListFeatures,
  baseMiscFeatures,
  baseParagraphFeatures,
  baseTextFeatures,
  baseTheme,
  baseUploadFeature,
  fixedToolbar,
  inlineToolbar,
} from '@/_components/lexicals/options'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const editorFullBlocks = {
  blocks: [
    ColumnsBlockConfig,
    CTABlockConfig,
    FormBlockConfig,
    PageGroupBlockConfig,
    TemplateBlockConfig,
    VideoPlayerBlockConfig,
    QuoteBlockConfig,
    ModalBlockConfig,
  ],
  inlineBlocks: [DynamicTextInlineBlockConfig],
}

export const editorFull = (options?: { blocks?: Block[]; inlineBlocks?: Block[] }) => {
  const { blocks, inlineBlocks } = options ?? {}
  return lexicalEditor({
    admin: baseAdmin,
    features: () => [
      fixedToolbar,
      inlineToolbar,
      baseUploadFeature,
      ...baseTextFeatures,
      ...baseParagraphFeatures,
      ...baseListFeatures,
      ...baseHeadingFeatures,
      ...baseMiscFeatures,
      DefinitionsFeature(),
      BlocksFeature({ blocks, inlineBlocks }),
    ],
    lexical: {
      theme: baseTheme,
      namespace: `rich-editor`,
    },
  })
}
