import {
  baseListFeatures,
  baseParagraphFeatures,
  baseTextFeatures,
  fixedToolbar,
  inlineToolbar,
} from '@/_components/lexicals/options'
import { defaultEditorLexicalConfig, lexicalEditor } from '@payloadcms/richtext-lexical'

// The small paragraph editor used inside fields; `extraFeatures` lets a collection add its own (the Glossary adds its definition links). Typed off the base text features because Payload's feature type is invariant in its props, so a plain FeatureProviderServer[] rejects LinkFeature
export const paragraphRichText = (extraFeatures: typeof baseTextFeatures = []) =>
  lexicalEditor({
    admin: {
      hideAddBlockButton: true,
      hideGutter: true,
    },
    lexical: {
      namespace: 'paragraph-rt',
      theme: {
        ...defaultEditorLexicalConfig.theme,
        root: (defaultEditorLexicalConfig.theme.root ?? '') + ' root root--paragraph-rt',
      },
    },
    features: [
      fixedToolbar,
      inlineToolbar,
      ...baseTextFeatures,
      ...baseListFeatures,
      ...baseParagraphFeatures,
      ...extraFeatures,
    ],
  })

export const editorParagraphRichText = paragraphRichText()
