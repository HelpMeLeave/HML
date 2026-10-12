import RichText, { type RichTextProps } from '@/lexicals/RenderRichText'
import type { RichTextBlock } from '@/payload-types'

export const RichTextComponent = ({
  content,
  converterOverrides,
  pageType,
  flow,
}: RichTextBlock & {
  converterOverrides?: RichTextProps['converterOverrides']
  pageType?: string
  flow?: boolean
}) => {
  return (
    <RichText
      data={content}
      enableGutter={false}
      converterOverrides={converterOverrides}
      pageType={pageType}
      flow={flow}
    />
  )
}
