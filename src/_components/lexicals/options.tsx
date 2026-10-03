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

// #region ! ---------- TEXT STATE ----------
const baseTextStateConfig = {
  state: {
    ...defaultColors,
  },
}
export const baseTextFeatures = [
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  LexicalLinkFeature,
  SuperscriptFeature(),
  BlockquoteFeature(),
  TextStateFeature(baseTextStateConfig),
]
// #endregion ! --------------------

// #region ! ---------- TOOLBARS ----------
const fixedToolbarConfig: Valid<Parameters<typeof FixedToolbarFeature>[number]> = {
  customGroups: {
    layout: { type: 'dropdown', order: 1 },
    format: { type: 'buttons', order: 2 },
    features: { type: 'buttons', order: 3 },
    text: { type: 'dropdown', order: 4 },
    indent: { type: 'buttons', order: 5 },
    blocks: { type: 'dropdown', order: 8 },
    add: { type: 'dropdown', order: 9 },
  },
  disableIfParentHasFixedToolbar: true,
}
export const fixedToolbar = FixedToolbarFeature(fixedToolbarConfig)
export const inlineToolbar = InlineToolbarFeature()
// #endregion ! --------------------

export const baseListFeatures = [
  CheckmarkListFeature(),
  OrderedListFeature(),
  UnorderedListFeature(),
  ListTitleFeature(),
]

export const baseParagraphFeatures = [ParagraphFeature(), IndentFeature(), AlignFeature()]

export const baseMiscFeatures = [
  RelationshipFeature(),
  EXPERIMENTAL_TableFeature(),
  PasteCleanupFeature(),
]
// #region ! ---------- UPLOAD ----------
const baseUploadConfig = {
  collections: {
    documents: {
      fields: [
        {
          type: 'text',
          name: 'adminTitle',
          label: 'Title',
        },
      ],
    },
  },
}
export const baseUploadFeature = UploadFeature(baseUploadConfig)
// #endregion ! --------------------

// #region ! ---------- HEADINGS ----------
const baseDefaultHeadingConfig = { enabledHeadingSizes: [] }
const baseDefaultHeadingFeature = HeadingFeature(baseDefaultHeadingConfig)

export const baseHeadingFeatures = [
  baseDefaultHeadingFeature,
  H4Feature(),
  SectionFeature(),
  SubSectionFeature(),
]

// #endregion ! --------------------

export const baseAdmin = {
  placeholder: 'Start typing...',
  hideGutter: true,
}

export const baseTheme = {
  ...defaultEditorLexicalConfig.theme,
  root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
}
