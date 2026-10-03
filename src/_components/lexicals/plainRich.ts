import { PasteCleanupFeature } from '@/_components/lexicals/Features/PasteCleanupFeature'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const editorPlainRich = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
  },
  features: () => [PasteCleanupFeature()],
})
