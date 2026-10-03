import RichText, { type RichTextProps } from '@/_components/lexicals/RenderRichText'
import type { RichTextBlock } from '@/payload-types'

export const RichTextComponent = ({
  content,
  converterOverrides,
  pageType,
}: RichTextBlock & {
  converterOverrides?: RichTextProps['converterOverrides']
  pageType?: string
}) => {
  return (
    <RichText
      data={content}
      enableGutter={false}
      converterOverrides={converterOverrides}
      pageType={pageType}
    />
  )
}
