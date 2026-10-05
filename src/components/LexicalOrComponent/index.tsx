import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { removeParagraph } from '@/_components/lexicals/RenderRichText/removeParagraphs'
import { isRootLike } from '@/lib/normalize/is'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'

export const LexicalOrComponent = ({
  content,
  converterOverrides,
}: {
  content: DefaultTypedEditorState | ReactNode
  converterOverrides?: JSXConverters
}) => {
  return (
    <>
      {isRootLike(content) ?
        <RichTextComponent
          converterOverrides={{
            ...converterOverrides,
            paragraph: removeParagraph,
          }}
          blockType={'rich-text'}
          content={content}
        />
      : content}
    </>
  )
}
