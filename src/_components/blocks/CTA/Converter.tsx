import { getBtnFromBlock } from '@/_components/blocks/CTA/_lib'
import { CTABlockServer } from '@/_components/blocks/CTA/AdminComponent'
import type { CTABlock } from '@/payload-types'
import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'

// Template and non-template CTAs share one path, so both get linked docs looked up and action buttons
export const CTABlockConverter = ({ node }: { node: SerializedBlockNode<CTABlock> }) => {
  const { title, subtitle, primary, secondary } = getBtnFromBlock(node.fields)

  if (!title || !primary) return null

  return (
    <CTABlockServer
      title={title}
      subtitle={subtitle}
      primary={primary}
      secondary={secondary}
    />
  )
}
