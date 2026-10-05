import { ColumnsBlockConfig } from '@/_components/blocks/Columns'
import { CTABlockConfig } from '@/_components/blocks/CTA'
import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { QuoteBlockConfig } from '@/_components/blocks/Quote'
import { VideoPlayerBlockConfig } from '@/_components/blocks/VideoPlayer'
import { DefinitionsFeature } from '@/_components/lexicals/Features/DefinitionsFeature'
import { baseFeatures } from '@/_components/lexicals/options'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const editorFullBlocks = {
  blocks: [
    ColumnsBlockConfig,
    CTABlockConfig,
    PageGroupBlockConfig,
    VideoPlayerBlockConfig,
    QuoteBlockConfig,
  ],
}

export const editorFull = (options?: { blocks?: Block[]; inlineBlocks?: Block[] }) => {
  const { blocks, inlineBlocks } = options ?? {}
  return lexicalEditor({
    features: () => [
      ...baseFeatures().all({ withMedia: true, withTable: true }),
      DefinitionsFeature(),
      BlocksFeature({ blocks, inlineBlocks }),
    ],
    views: '@/_components/lexicals/View',
  })
}
