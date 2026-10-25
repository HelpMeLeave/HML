import { ActionToolbarFeature } from '@/lexicals/Features/ActionToolbar/feature.server'
import { BlockGateFeature } from '@/lexicals/Features/BlockGate/feature.server'
import { CustomCheckmarkServer as CheckmarkListFeature } from '@/lexicals/Features/CheckmarkList/feature.server'
import { DefinitionsFeature } from '@/lexicals/Features/DefinitionsFeature'
import { DuotoneFeature } from '@/lexicals/Features/Duotone/feature.server'
import { EditableSyncFeature } from '@/lexicals/Features/EditableSync/feature.server'
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
import type { EditorThemeClasses } from '@payloadcms/richtext-lexical/lexical'
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
  EditableSyncFeature(),
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
  BlockGateFeature(),
]
// #endregion ! --------------------

export const baseTheme: EditorThemeClasses = {
  ...defaultEditorLexicalConfig.theme,
  // root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
  root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? '', '*:mt-4 *:first:mt-0'),
  upload:
    /* cn('lexical-upload', defaultEditorLexicalConfig.theme.upload ?? '') */ 'lexical-upload',
  paragraph: 'text-body leading-normal font-normal [:is(.rich-list-item__body>*)]:first:mt-0 mb-0',
  text: {
    italic: 'text-accent-muted dark:text-accent-150 dark:font-extralight',
    bold: 'font-medium text-accent dark:font-light',
    base: '[font-family:inherit] leading-[inherit] tacking-[inherit]',
  },
  link: cn('pointer-events-none border-b-2 border-accent/50 text-body no-underline hover:border-b'),
  heading: {
    h2: '',
  },
}
