import { CustomCheckmarkServer as CheckmarkListFeature } from '@/_components/lexicals/Features/CheckmarkList/feature.server'
import { H4Feature } from '@/_components/lexicals/Features/H4Feature'
import { LexicalLinkFeature } from '@/_components/lexicals/Features/LinkFeature'
import { ListTitleFeature } from '@/_components/lexicals/Features/ListTitleFeature/feature.server'
import { PasteCleanupFeature } from '@/_components/lexicals/Features/PasteCleanupFeature'
import { SectionFeature } from '@/_components/lexicals/Features/SectionFeature'
import { SubSectionFeature } from '@/_components/lexicals/Features/SubSectionFeature/feature.server'
import { cn } from '@/lib/cn'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  defaultColors,
  defaultEditorLexicalConfig,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  SuperscriptFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import type { FeaturesInput } from './types'

// #region ! ---------- TEXT STATE ----------
export const baseTextFeatures = [
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  LexicalLinkFeature,
  SuperscriptFeature(),
  BlockquoteFeature(),
  TextStateFeature({ state: { ...defaultColors } }),
]
// #endregion ! --------------------

// #region ! ---------- TOOLBARS ----------
export const fixedToolbar = FixedToolbarFeature({
  customGroups: {
    layout: { type: 'dropdown', order: 1 },
    format: { type: 'buttons', order: 2 },
    features: { type: 'buttons', order: 3 },
    text: { type: 'dropdown', order: 4 },
    indent: { type: 'buttons', order: 5 },
    blocks: { type: 'dropdown', order: 8 },
    add: { type: 'dropdown', order: 9 },
  },
})
export const inlineToolbar = InlineToolbarFeature()
// #endregion ! --------------------

export const baseListFeatures = [
  CheckmarkListFeature(),
  OrderedListFeature(),
  UnorderedListFeature(),
  ListTitleFeature(),
]

export const baseParagraphFeatures = [ParagraphFeature(), IndentFeature(), AlignFeature()]

// #endregion ! --------------------

export const baseAdmin = {
  placeholder: 'Start typing...',
  hideGutter: true,
}

export function baseFeatures() {
  const inline = [
    ParagraphFeature(),
    IndentFeature(),
    AlignFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LexicalLinkFeature,
    SuperscriptFeature(),
    BlockquoteFeature(),
    TextStateFeature({ state: { ...defaultColors } }),
  ]

  const block = [
    HeadingFeature({ enabledHeadingSizes: [] }),
    H4Feature(),
    SectionFeature(),
    SubSectionFeature(),
    CheckmarkListFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    ListTitleFeature(),
    PasteCleanupFeature(),
  ]

  const media = [
    RelationshipFeature(),
    UploadFeature({
      collections: {
        documents: { fields: [{ type: 'text', name: 'adminTitle', label: 'Title' }] },
      },
    }),
  ]

  const table = EXPERIMENTAL_TableFeature()
  const toolbars = [fixedToolbar, inlineToolbar]

  return {
    inline,
    block,
    media,
    toolbars,
    table,
    content: () => [...inline, ...block],
    nested: function () {
      return [...this.content(), ...toolbars]
    },
    all: function (options?: { withMedia?: true; withTable?: true }) {
      const features: FeaturesInput[] = this.nested()

      const { withMedia, withTable } = options ?? {}
      withMedia === true && features.push(...this.media)
      withTable === true && features.push(this.table)

      return features
    },
  }
}

export const baseTheme = {
  ...defaultEditorLexicalConfig.theme,
  root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
}
