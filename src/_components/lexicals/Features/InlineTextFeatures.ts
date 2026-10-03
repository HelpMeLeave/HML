import { LexicalLinkFeature } from '@/_components/lexicals/Features/LinkFeature'
import type { FeaturesInput } from '@/_components/lexicals/types'
import {
  BoldFeature,
  defaultColors,
  ItalicFeature,
  TextStateFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const InlineTextFeatures: FeaturesInput[] = [
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  LexicalLinkFeature,
  TextStateFeature({
    state: {
      ...defaultColors,
    },
  }),
]
