import { baseTextFeatures } from '@/_components/lexicals/options'
import {
  defaultEditorLexicalConfig,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const pageSubtitleTitleLexical = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
    hideDraggableBlockElement: true,
    hideInsertParagraphAtEnd: true,
    hideGutter: true,
    placeholder: 'Subtitle....',
  },
  lexical: {
    namespace: 'pageSubtitle',
    theme: { ...defaultEditorLexicalConfig.theme },
  },

  features: [InlineToolbarFeature(), ...baseTextFeatures],
})
export const pageBrowLexical = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
    hideDraggableBlockElement: true,
    hideInsertParagraphAtEnd: true,
    hideGutter: true,
    placeholder: 'Brow....',
  },
  lexical: {
    namespace: 'pageBrow',
    theme: { ...defaultEditorLexicalConfig.theme },
  },

  features: [InlineToolbarFeature(), ...baseTextFeatures],
})
