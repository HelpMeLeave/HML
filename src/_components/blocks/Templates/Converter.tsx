import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { RichTextBlock, Template } from '@/payload-types'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const TemplateConverter = ({ node }: { node: SerializedBlockNode }) => {
  const template = (node.fields.template as Template).blockConfig as RichTextBlock[]
  return template.map((ea) => (
    <RichTextComponent
      key={ea.id}
      content={ea.content}
      blockType={'rich-text'}
    />
  ))
}
