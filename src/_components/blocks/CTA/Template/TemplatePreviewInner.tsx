'use client'
import { getBtnFromBlockTemplate } from '@/_components/blocks/CTA/_lib'
import { CTA } from '@/_components/blocks/CTA/Component'
import { getTemplate } from '@/_components/blocks/CTA/Template/_lib'
import RichText from '@/_components/lexicals/RenderRichText'
import { use } from 'react'
import { Wrapper } from './Wrapper'

// Suspended inner component — use() reads the cached promise
export const TemplatePreviewInner = ({ templateId }: { templateId: string }) => {
  const template = use(getTemplate(templateId))
  const block = template?.blockConfig?.[0]

  const data = block && block.blockType == 'cta' && getBtnFromBlockTemplate(block)
  if (!data) return null

  const { titleBlock, subtitleBlock, secondaryButton, primaryButton } = data

  return (
    <Wrapper>
      <CTA
        title={titleBlock && <RichText data={titleBlock} />}
        subtitle={subtitleBlock && <RichText data={subtitleBlock} />}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </Wrapper>
  )
}
