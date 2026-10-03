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
import {
  DynamicTextInlineBlockConfig,
  FormBlockConfig,
  PageGroupBlockConfig,
  QuoteBlockConfig,
  TemplateBlockConfig,
  VideoPlayerBlockConfig,
} from '@/_config/Blocks'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const lexicalBase = (...blocks: Block[]) => {
  const allBlocks = new Set([
    ...blocks,
    FormBlockConfig,
    PageGroupBlockConfig,
    TemplateBlockConfig,
    VideoPlayerBlockConfig,
    QuoteBlockConfig,
  ])
  return lexicalEditor({
    admin: baseAdmin,
    features: () => [
      fixedToolbar,
      inlineToolbar,
      baseUploadFeature,
      ...baseTextFeatures,
      ...baseHeadingFeatures,
      ...baseListFeatures,
      ...baseParagraphFeatures,
      ...baseMiscFeatures,
      BlocksFeature({
        blocks: [...allBlocks],
        inlineBlocks: [DynamicTextInlineBlockConfig],
      }),
    ],
    lexical: {
      theme: baseTheme,
      namespace: `rich-editor`,
    },
  })
}
