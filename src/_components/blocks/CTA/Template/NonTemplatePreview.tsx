import { createTextRoot, toPreviewBtn } from '@/_components/blocks/CTA/_lib'
import type { NonTemplatePreviewProps } from '@/_components/blocks/CTA/_types'
import { CTA } from '@/_components/blocks/CTA/Component'
import RichText from '@/_components/lexicals/RenderRichText'
import { Wrapper } from './Wrapper'

export const NonTemplatePreview = ({
  titleState,
  subtitleState,
  primary,
  secondary,
}: NonTemplatePreviewProps) => {
  const title = createTextRoot(titleState)
  const subtitle = createTextRoot(subtitleState)

  return (
    title && (
      <Wrapper>
        <CTA
          title={<RichText data={title} />}
          subtitle={subtitle ? <RichText data={subtitle} /> : undefined}
          primaryButton={toPreviewBtn(primary)}
          secondaryButton={secondary?.text ? toPreviewBtn(secondary) : undefined}
        />
      </Wrapper>
    )
  )
}
