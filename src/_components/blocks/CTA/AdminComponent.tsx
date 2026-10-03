import { toCTABtn } from '@/_components/blocks/CTA/_lib'
import type { ResolvedCTA } from '@/_components/blocks/CTA/_types'
import { ctaActionRenders } from '@/_components/blocks/CTA/actions/render'
import { CTA } from '@/_components/blocks/CTA/Component'
import type { CTABlock } from '@/payload-types'
import { getPayload } from '@/server/getPayload'

// A linked doc arrives as a bare id when the page wasn't read deep enough (always, inside a template); look it up here so toCTABtn gets a populated doc
const resolveBtn = async (
  btn: CTABlock['primaryButton'] | CTABlock['secondaryButton'] | undefined
) => {
  if (btn?.doc && typeof btn.doc.value == 'number') {
    const payload = await getPayload()
    const value = await payload.findByID({
      collection: btn.doc.relationTo,
      id: btn.doc.value,
      select: { url: true },
      disableErrors: true,
    })
    if (value) btn = { ...btn, doc: { ...btn.doc, value } as typeof btn.doc }
  }
  return toCTABtn(btn)
}

/**
 * TODO: DESCRIPTION
 */
export const CTABlockServer = async ({
  title,
  subtitle,
  primary,
  secondary,
}: Partial<ResolvedCTA>) => {
  const [primaryBtn, secondaryBtn] = await Promise.all([resolveBtn(primary), resolveBtn(secondary)])

  if (!primaryBtn) return null

  // the CTA doesn't know what an action opens; the action's own entry renders the button
  if ('action' in primaryBtn && primaryBtn.action) {
    primaryBtn.element = await ctaActionRenders[primaryBtn.action](primaryBtn.text)
  }

  return (
    <CTA
      primaryButton={primaryBtn}
      secondaryButton={secondaryBtn}
      title={title}
      subtitle={subtitle}
    />
  )
}
