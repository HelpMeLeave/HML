import { ActionToolbarFeature } from '@/lexicals/Features/ActionToolbar/feature.server'
import { CustomCheckmarkServer as CheckmarkListFeature } from '@/lexicals/Features/CheckmarkList/feature.server'
import { DefinitionsFeature } from '@/lexicals/Features/DefinitionsFeature'
import { DuotoneFeature } from '@/lexicals/Features/Duotone/feature.server'
import { LexicalLinkFeature } from '@/lexicals/Features/LinkFeature'
import { ListTitleFeature } from '@/lexicals/Features/ListTitleFeature/feature.server'
import { PasteCleanupFeature } from '@/lexicals/Features/PasteCleanupFeature'
import { RichListItemFeature } from '@/lexicals/Features/RichListItem/feature.server'
import { SectionCoverFeature } from '@/lexicals/Features/SectionCover/feature.server'
import { cn } from '@/lib/cn'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  defaultColors,
  defaultEditorLexicalConfig,
  EXPERIMENTAL_TableFeature,
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
} from '@payloadcms/richtext-lexical'
import { HeadingFeatures } from './_lib/HeadingFeature'
import { FixedToolbarFeature } from './_lib/Toolbars'
import { UploadFeature } from './_lib/UploadFeature'
import { CalloutFeature } from './Features/Callout'

// #endregion ! --------------------

export const baseAdmin = {
  placeholder: 'Start typing...',
  hideGutter: true,
}

// #region ! ---------- EDITOR TIERS ----------
export const singleLineFeatures = [
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  LexicalLinkFeature,
  SuperscriptFeature(),
  TextStateFeature({ state: { ...defaultColors } }),
  InlineToolbarFeature(),
  PasteCleanupFeature(),
]

export const multiLineFeatures = [
  ...singleLineFeatures,
  CheckmarkListFeature(),
  OrderedListFeature(),
  UnorderedListFeature(),
  ListTitleFeature(),
  RichListItemFeature(),
  ParagraphFeature(),
  IndentFeature(),
  AlignFeature(),
  EXPERIMENTAL_TableFeature(),
  CalloutFeature(),
  FixedToolbarFeature,
  ActionToolbarFeature(),
]

export const contentFeatures = [
  ...multiLineFeatures,
  ...HeadingFeatures,
  BlockquoteFeature(),
  RelationshipFeature(),
  UploadFeature,
  DuotoneFeature(),
  SectionCoverFeature(),
  DefinitionsFeature(),
]
// #endregion ! --------------------

export const baseTheme = {
  ...defaultEditorLexicalConfig.theme,
  root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
  upload: cn('lexical-upload', defaultEditorLexicalConfig.theme.upload ?? ''),
}
