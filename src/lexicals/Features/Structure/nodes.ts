import { HEADING_STYLES, type HeadingStyleState } from '@/lexicals/Features/_lib/nodeStates'
import {
  $createParagraphNode,
  // $getSelection,
  $getState,
  $getStateChange,
  $isElementNode,
  // $isRangeSelection,
  $setState,
  ElementNode,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'

export type StructureDOM = {
  tag: keyof HTMLElementTagNameMap
  className?: string
  placeholder?: string
  slot?: string
}

/** No text anywhere beneath this node. */
const $isBlank = (node: LexicalNode): boolean =>
  $isElementNode(node) ? node.getChildren().every($isBlank) : node.getTextContent() === ''

/** Section and SubSection are the same shape: a container holding heading lines plus one shadow-root body. These bases carry that shape and its keyboard behaviour, so each feature only declares its own types and DOM. */
export abstract class StructureNode extends ElementNode {
  abstract dom(): StructureDOM

  createDOM() {
    const { tag, className, placeholder, slot } = this.dom()
    const el = document.createElement(tag)
    if (className) el.className = className
    if (placeholder) el.dataset.placeholder = placeholder
    if (slot) el.dataset.slot = slot
    return el
  }

  updateDOM() {
    return false
  }

  isInline() {
    return false
  }
}

export abstract class StructureContainerNode extends StructureNode {
  /** Which look the container renders with, independent of its h2/h3 level. */
  abstract headingStyleState(): HeadingStyleState

  getHeadingStyle() {
    return $getState(this, this.headingStyleState())
  }

  isHeadingStyleSwapped() {
    const state = this.headingStyleState()
    return $getState(this, state) != state.defaultValue
  }

  /** The style one step up (larger) or down (smaller), or null past the list or more than one step from the container's own level. */
  nextHeadingStyle(dir: 'up' | 'down') {
    const own = HEADING_STYLES.indexOf(this.headingStyleState().defaultValue)
    const next = HEADING_STYLES.indexOf(this.getHeadingStyle()) + (dir == 'down' ? 1 : -1)
    return Math.abs(next - own) <= 1 ? (HEADING_STYLES[next] ?? null) : null
  }

  stepHeadingStyle(dir: 'up' | 'down') {
    const next = this.nextHeadingStyle(dir)
    return next ? $setState(this, this.headingStyleState(), next) : this
  }

  createDOM() {
    const el = super.createDOM()
    el.dataset.variant = this.getHeadingStyle()
    return el
  }

  updateDOM(prevNode?: this, dom?: HTMLElement) {
    const change = prevNode && $getStateChange(this, prevNode, this.headingStyleState())
    if (change && dom) dom.dataset.variant = change[0]
    return false
  }

  canBeEmpty() {
    return false
  }

  insertNewAfter() {
    return null
  }

  getContent() {
    return this.getChildren().find($isStructureContent) ?? null
  }

  /** Every heading line: the Section hgroup's eyebrow/heading/subtitle, or the SubSection heading. */
  getHeadingLines() {
    return this.getChildren()
      .filter((ea) => !$isStructureContent(ea))
      .flatMap((ea) =>
        $isStructureHeading(ea) ? [ea]
        : $isElementNode(ea) ? ea.getChildren().filter($isStructureHeading)
        : []
      )
  }

  /** Drop the wrapper, lifting the body back into the surrounding flow. `keepHeadings` lifts non-blank heading lines too, as paragraphs. */
  dissolve(keepHeadings = false) {
    const lines = keepHeadings ? this.getHeadingLines().filter((ea) => !$isBlank(ea)) : []
    const children = [
      ...lines.map((ea) => $createParagraphNode().append(...ea.getChildren())),
      ...(this.getContent()?.getChildren() ?? []),
    ]

    if (children.length == 0 || (children.length == 1 && children[0].getTextContent() == '')) {
      const paragraph = $createParagraphNode()
      this.insertAfter(paragraph)
      this.remove()
      paragraph.select()
      return
    }

    for (const child of [...children].reverse()) this.insertAfter(child)
    this.remove()
    children[0].selectStart()
  }
}

export abstract class StructureContentNode extends StructureNode {
  isShadowRoot() {
    return true
  }

  /** Backspace at the very start of an otherwise empty body dissolves the container. */
  collapseAtStart() {
    const container = this.getParent()
    const first = this.getFirstChild()

    if (!$isStructureContainer(container) || this.getChildrenSize() != 1) return false
    if (!first || first.getTextContent() != '') return false

    container.dissolve()
    return true
  }
}

/** One line of a container's heading: the Section hgroup, or the SubSection heading itself. */
export abstract class StructureHeadingNode extends StructureNode {
  /** Enter moves to the next heading line, then into the body once there are none left. A body that opens with a nested container gets a fresh line above it instead. */
  insertNewAfter() {
    const next = this.getNextSibling()

    if (next && !$isStructureContent(next)) {
      next.selectStart()
      return null
    }

    const content = $containerOf(this)?.getContent()
    const first = content?.getFirstChild()

    if (first && !$isStructureContainer(first)) first.selectStart()
    else if (content) {
      const paragraph = $createParagraphNode()
      content.splice(0, 0, [paragraph])
      paragraph.select()
    }

    return null
  }

  /** Backspace at the start of a heading line: dissolves the container once no heading text is left, otherwise steps back a line instead of merging into it. */
  collapseAtStart() {
    const container = $containerOf(this)
    if (!container) return false

    // Every heading line, not container.getTextContent(): an element joins block children with blank lines, so an hgroup of empty lines would not read as ''.
    // if (!container.getChildren().filter((child) => !$isStructureContent(child)).every($isBlank))
    //   return false
    if (
      container
        .getChildren()
        .filter((child) => !$isStructureContent(child))
        .every($isBlank)
    ) {
      container.dissolve()
      return true
    }

    const prev = this.getPreviousSibling()
    if ($isStructureHeading(prev)) prev.selectEnd()
    return true
  }
}

export const $isStructureContainer = (
  node: LexicalNode | null | undefined
): node is StructureContainerNode => node instanceof StructureContainerNode

export const $isStructureContent = (
  node: LexicalNode | null | undefined
): node is StructureContentNode => node instanceof StructureContentNode

export const $isStructureHeading = (
  node: LexicalNode | null | undefined
): node is StructureHeadingNode => node instanceof StructureHeadingNode

const $containerOf = (node: LexicalNode) => $findMatchingParent(node, $isStructureContainer)
