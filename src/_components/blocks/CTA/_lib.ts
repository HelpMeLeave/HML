import type { CTABtn } from '@/_components/blocks/CTA/_types'
import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import type { CTABlock, Template } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type {
  SerializedElementNode,
  SerializedRootNode,
} from '@payloadcms/richtext-lexical/lexical'

// The one place a saved CTA button becomes something the CTA can render
export const toCTABtn = (
  btn: CTABlock['primaryButton'] | CTABlock['secondaryButton'] | undefined
): CTABtn | undefined => {
  if (!btn?.text) return undefined
  // only the primary button has actions
  if ('actionType' in btn && btn.actionType == 'action')
    return { text: btn.text, action: btn.action }
  const { url, target } = resolveLinkNode(btn as unknown as LinkField)
  if (!url) return undefined
  return { text: btn.text, href: url, target }
}

export const getBtnFromBlock = (
  block: CTABlock
): Pick<CTABlock, 'title' | 'subtitle'> & {
  primary: CTABlock['primaryButton']
  secondary: CTABlock['secondaryButton']
} => {
  let cta: CTABlock = block

  if (block.useTemplate && block.blockType == 'cta') {
    cta = (block.template as Template).blockConfig?.[0] as CTABlock
  }

  return {
    primary: cta.primaryButton,
    secondary: cta.secondaryButton,
    title: cta.title,
    subtitle: cta.subtitle,
  }
}

// Admin previews only need the button to look right: a linked doc there is a bare id and there's no wizard data, so anything that can't resolve still shows as a plain button
// Always returns a button, so the primary shows while its text is still being typed
export const toPreviewBtn = (
  btn: CTABlock['primaryButton'] | CTABlock['secondaryButton'] | undefined
): CTABtn => {
  const resolved = toCTABtn(btn)
  return resolved && 'href' in resolved ?
      resolved
    : { text: btn?.text ?? '', href: '', target: '_self' }
}

export const getBtnFromBlockTemplate = (block: CTABlock) => {
  const { primary, secondary, title, subtitle } = getBtnFromBlock(block)

  const titleBlock = createTextRoot(title)

  if (!titleBlock?.root.children) return null

  const subtitleBlock = subtitle && createTextRoot(subtitle)

  const secondaryButton = secondary?.text ? toPreviewBtn(secondary) : undefined
  const primaryButton = toPreviewBtn(primary)

  return {
    titleBlock,
    subtitleBlock,
    secondaryButton,
    primaryButton,
  }
}

export const createTextRoot = (
  node?: { root: SerializedRootNode } | null
): DefaultTypedEditorState | null | undefined =>
  node
  && ({
    root: {
      ...node?.root,
      children: (node?.root?.children?.[0] as SerializedElementNode | undefined)?.children,
    } as SerializedRootNode,
  } as DefaultTypedEditorState)
