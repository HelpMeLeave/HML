import {
  $isSectionHGroupNode,
  type SectionHGroupNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import { $isSectionContent } from '@/lexicals/Features/SectionFeature/SectionStructureNodes'
import { $isUploadNode, type UploadNode } from '@payloadcms/richtext-lexical/client'
import {
  $getSelection,
  $isElementNode,
  $isNodeSelection,
  $isRangeSelection,
  createCommand,
  type BaseSelection,
  type NodeKey,
} from '@payloadcms/richtext-lexical/lexical'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'

export const COVER_COLLECTIONS = ['media-content'] as const

export const OPEN_COVER_DRAWER_COMMAND = createCommand<NodeKey>('OPEN_COVER_DRAWER_COMMAND')

export const $getHGroupFromSelection = (selection: BaseSelection | null) => {
  const node =
    $isRangeSelection(selection) ? selection.anchor.getNode()
    : $isNodeSelection(selection) ? selection.getNodes()[0]
    : null
  return node ? ($findMatchingParent(node, $isSectionHGroupNode) as SectionHGroupNode | null) : null
}

const isValid = <R, T>(entry: T, chk: (props: T | R) => props is R) => {
  if (Boolean(chk(entry)) == true) {
    return entry as unknown as R
  }
}

export const $getCover = (hgroup: Nullish<SectionHGroupNode>): UploadNode | null =>
  isValid(hgroup?.getFirstChild(), $isUploadNode) ?? null

export const $normalizeCover = (hgroup: SectionHGroupNode) => {
  const uploads = hgroup.getChildren().filter($isUploadNode)
  if (uploads.length == 0) return

  const [cover, ...extras] = uploads
  const first = hgroup.getFirstChild()
  if (first && first !== cover) first.insertBefore(cover)

  if (extras.length == 0) return

  const content = hgroup.getNextSibling()

  if ($isSectionContent(content)) {
    content.splice(0, 0, extras)
  } else {
    extras.forEach((node) => node.remove())
  }
}

export const $isCaretAfterCover = (selection: BaseSelection | null) => {
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false
  if (selection.anchor.offset !== 0) return false

  const anchor = selection.anchor.getNode()
  const hgroup = $findMatchingParent(anchor, $isSectionHGroupNode) as SectionHGroupNode | null

  const cover = hgroup && $getCover(hgroup)

  if (!hgroup || !cover) return false

  const child = $findMatchingParent(anchor, (node) => node.getParent()?.is(hgroup) ?? false)

  if (
    child
    && child.getPreviousSibling()?.is(cover)
    && (anchor.is(child) || ($isElementNode(child) && anchor.is(child.getFirstDescendant())))
  ) {
    return hgroup.getChildren().some((c) => c.getTextContent() !== '')
  }
  return false
}

export const $hgroupAtCaret = () => $getHGroupFromSelection($getSelection())
