import { $ejectContainerContents } from '@/_components/lexicals/Features/_lib/ejectContainerContents'
import {
  $isElementNode,
  type ElementNode,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'

/**
 * Backspace inside an empty container heading: dissolve the container and lift its body back into the flow. Returns true when it handled the event.
 *
 * `heading` is whatever holds the container's title — the hgroup for Section, the heading node for SubSection.
 */
export function $ejectOnEmptyHeading<C extends ElementNode>(
  event: KeyboardEvent | null,
  start: LexicalNode | null,
  {
    isHeading,
    isContainer,
    isContent,
  }: {
    isHeading: (node: LexicalNode) => boolean
    isContainer: (node: LexicalNode | null) => node is C
    isContent: (node: LexicalNode | null) => node is ElementNode
  }
): boolean {
  const heading = start && $findMatchingParent(start, isHeading)
  if (!$isElementNode(heading)) return false

  // Per child, not heading.getTextContent(): an element joins block children with blank lines, so an hgroup of empty lines would not read as ''.
  if (!heading.getChildren().every((child) => child.getTextContent() === '')) return false

  const container = heading.getParent()
  if (!isContainer(container)) return false

  event?.preventDefault()
  $ejectContainerContents(container, isContent)
  return true
}
