import { ColumnsBlockConfig } from '@/_components/blocks/Columns'
import { CTABlockConfig } from '@/_components/blocks/CTA'
import { FormBlockConfig } from '@/_components/blocks/Form'
import { PageGroupBlockConfig } from '@/_components/blocks/PageGroup'
import { TemplateBlockConfig } from '@/_components/blocks/Templates'
import { VideoPlayerBlockConfig } from '@/_components/blocks/VideoPlayer'
import { contentEditor } from '@/lexicals/editors'
// import { CheckmarkListFeature } from '@/lexicals/Features/CheckmarkList'
// import { H4Feature } from '@/lexicals/Features/H4Feature'
// import { LexicalLinkFeature } from '@/lexicals/Features/LinkFeature'
// import { PasteCleanupFeature } from '@/lexicals/Features/PasteCleanupFeature'
// import { SectionFeature } from '@/lexicals/Features/SectionFeature'
// import { SubSectionFeature } from '@/lexicals/Features/SubSectionFeature/feature.server'
// import { cn } from '@/lib/cn'
// import {
//   BlockquoteFeature,
//   BlocksFeature,
//   BoldFeature,
//   defaultColors,
//   defaultEditorLexicalConfig,
//   EXPERIMENTAL_TableFeature,
//   FixedToolbarFeature,
//   HeadingFeature,
//   IndentFeature,
//   InlineToolbarFeature,
//   ItalicFeature,
//   lexicalEditor,
//   OrderedListFeature,
//   ParagraphFeature,
//   RelationshipFeature,
//   SuperscriptFeature,
//   TextStateFeature,
//   UnderlineFeature,
//   UnorderedListFeature,
//   UploadFeature,
// } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const RichTextConfig: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: false,
      required: true,
      editor: contentEditor({
        blocks: [
          ColumnsBlockConfig,
          CTABlockConfig,
          FormBlockConfig,
          PageGroupBlockConfig,
          TemplateBlockConfig,
          VideoPlayerBlockConfig,
        ],
      }),
      //       editor: lexicalEditor({
      //         admin: {
      //           placeholder: 'Start typing...',
      //           hideGutter: true,
      //         },
      //         features: () => [
      //           FixedToolbarFeature({
      //             customGroups: {
      //               layout: { type: 'dropdown', order: 1 },
      //               format: { type: 'buttons', order: 2 },
      //               features: { type: 'buttons', order: 3 },
      //               text: { type: 'dropdown', order: 4 },
      //               indent: { type: 'buttons', order: 5 },
      //               blocks: { type: 'dropdown', order: 8 },
      //               add: { type: 'dropdown', order: 9 },
      //             },
      //             disableIfParentHasFixedToolbar: true,
      //           }),
      //           RelationshipFeature(),
      //           UploadFeature({
      //             collections: {
      //               documents: {
      //                 fields: [
      //                   {
      //                     type: 'text',
      //                     name: 'adminTitle',
      //                     label: 'Title',
      //                   },
      //                 ],
      //               },
      //             },
      //           }),
      //           InlineToolbarFeature(),
      //           UnderlineFeature(),
      //           BoldFeature(),
      //           ItalicFeature(),
      //           LexicalLinkFeature,
      //           SuperscriptFeature(),
      //           BlockquoteFeature(),
      //           TextStateFeature({
      //             state: {
      //               ...defaultColors,
      //             },
      //           }),
      //           HeadingFeature({ enabledHeadingSizes: [] }),
      //           H4Feature(),
      //           SectionFeature(),
      //           SubSectionFeature(),
      //           CheckmarkListFeature(),
      //           OrderedListFeature(),
      //           UnorderedListFeature(),
      //           ParagraphFeature(),
      //           IndentFeature(),
      //           EXPERIMENTAL_TableFeature(),
      //           PasteCleanupFeature(),
      //           BlocksFeature({
      //             blocks: [
      //               ColumnsBlockConfig,
      //               CTABlockConfig,
      //               FormBlockConfig,
      //               PageGroupBlockConfig,
      //               TemplateBlockConfig,
      //               VideoPlayerBlockConfig,
      //             ],
      //             inlineBlocks: [DynamicTextInlineBlockConfig],
      //           }),
      //         ],
      //         lexical: {
      //           theme: {
      //             ...defaultEditorLexicalConfig.theme,
      //             root: cn(`rich-editor`, defaultEditorLexicalConfig.theme.root ?? ''),
      //           },
      //           namespace: `rich-editor`,
      //         },
      //       }),
    },
  ],
}
