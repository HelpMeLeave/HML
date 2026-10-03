import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { RichTextBlock } from '@/payload-types'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const RichTextBlockConverter = ({ node }: { node: SerializedBlockNode<RichTextBlock> }) => (
  <RichTextComponent {...node.fields} />
)
