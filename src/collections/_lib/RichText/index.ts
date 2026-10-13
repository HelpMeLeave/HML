import type { BaseFieldProps } from '@/collections/_lib/_types'
import { contentEditor, multiLineEditor } from '@/lexicals/editors'
import { baseAdmin, baseTheme } from '@/lexicals/options'
import {
  type FeatureProviderServer,
  type LexicalEditorProps,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

const RichTextCellPath = '@/collections/_lib/RichText/Cell'

type LexicalProvider = ReturnType<typeof multiLineEditor>
type LexicalProps = Omit<LexicalEditorProps, 'features'> & {
  features: FeatureProviderServer[]
}
type ConfigEditorProp = LexicalProvider | LexicalProps | undefined

const createEditor = (editor: ConfigEditorProp) => {
  if (!editor) return editorOptions.withoutBlocks
  if (typeof editor == 'function') return editor

  return lexicalEditor({
    ...editor,
    admin: {
      ...baseAdmin,
      ...editor.admin,
    },
    features: ({ rootFeatures }) => [...rootFeatures, ...(editor.features ?? [])],
    lexical: {
      ...editor.lexical,
      theme: {
        ...baseTheme,
        ...editor.lexical?.theme,
      },
      namespace: editor.lexical?.namespace ?? 'rich-editor',
    },
  })
}

const editorOptions = {
  fullPage: contentEditor(),
  withoutBlocks: multiLineEditor(),
}

export const RichTextConfig = (
  name: string,
  editor?: LexicalProvider | LexicalProps,
  options?: Omit<BaseFieldProps<RichTextField>, 'editor'>
): RichTextField => {
  return {
    ...options,
    name,
    type: 'richText',
    editor: createEditor(editor),
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Cell: RichTextCellPath,
      },
    },
  }
}
