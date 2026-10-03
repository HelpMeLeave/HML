import { DynamicConverter } from '@/_components/inlineBlocks/DynamicText/Render'
import type { DynamicTextBlock } from '@/payload-types'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'

export type InlineBlocks = DynamicTextBlock

export const inlineBlocks: JSXConverters<InlineBlocks>['inlineBlocks'] = {
  'dynamic-text': DynamicConverter,
}
