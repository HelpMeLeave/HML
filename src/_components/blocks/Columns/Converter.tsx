import { ColumnsComponent } from '@/_components/blocks/Columns/Component'
import type { ColumnsBlock } from '@/payload-types'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const ColumnsConverter = ({ node }: { node: SerializedBlockNode<ColumnsBlock> }) => {
  return <ColumnsComponent {...node.fields} />
}
