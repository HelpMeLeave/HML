// import {
//   ColumnsBlockConfig,
//   CTABlockConfig,
//   PageGroupBlockConfig,
//   QuoteBlockConfig,
//   VideoPlayerBlockConfig,
// } from '@/_config/Blocks'
import {
  BlocksFeature,
  defaultEditorLexicalConfig,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import type { FeaturesInput } from './_types'
import {
  baseAdmin,
  baseTheme,
  contentFeatures,
  multiLineFeatures,
  singleLineFeatures,
} from './options'

/** Text formatting only: brows, subtitles, quotes. */
export const singleLineEditor = ({
  namespace,
  placeholder,
}: {
  namespace: string
  placeholder?: string
}) =>
  lexicalEditor({
    admin: {
      hideAddBlockButton: true,
      hideDraggableBlockElement: true,
      hideInsertParagraphAtEnd: true,
      hideGutter: true,
      placeholder,
    },
    lexical: { namespace, theme: { ...defaultEditorLexicalConfig.theme } },
    features: singleLineFeatures,
  })

/** Paragraphs, lists and tables. `extraFeatures` lets a collection add its own (the Glossary adds its definition links). */
export const multiLineEditor = (extraFeatures: FeaturesInput[] = []) =>
  lexicalEditor({
    admin: { hideAddBlockButton: true, hideGutter: true },
    lexical: {
      namespace: 'paragraph-rt',
      theme: {
        ...defaultEditorLexicalConfig.theme,
        root: (defaultEditorLexicalConfig.theme.root ?? '') + ' root root--paragraph-rt',
      },
    },
    features: [...multiLineFeatures, ...extraFeatures],
  })

/** Full page content: headings, sections, uploads, definitions, plus blocks when given. */
export const contentEditor = ({
  blocks,
  inlineBlocks,
}: { blocks?: Block[]; inlineBlocks?: Block[] } = {}) =>
  lexicalEditor({
    admin: baseAdmin,
    lexical: { namespace: 'rich-editor', theme: baseTheme },
    features: [
      ...contentFeatures,
      ...(blocks || inlineBlocks ? [BlocksFeature({ blocks, inlineBlocks })] : []),
    ],
  })
