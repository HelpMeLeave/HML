import { baseTextFeatures, inlineToolbar } from '@/_components/lexicals/options'
import { defaultEditorLexicalConfig, lexicalEditor } from '@payloadcms/richtext-lexical'

export const inlineRichText = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
    hideDraggableBlockElement: true,
    hideInsertParagraphAtEnd: true,
    hideGutter: true,
  },
  lexical: {
    namespace: 'inline-rt',
    theme: {
      ...defaultEditorLexicalConfig.theme,
      root: (defaultEditorLexicalConfig.theme.root ?? '') + ' root root--inline',
    },
  },
  features: [inlineToolbar, ...baseTextFeatures],
})
