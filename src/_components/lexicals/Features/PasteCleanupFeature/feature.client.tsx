'use client'

import {
  $createCheckmarkListItemNode,
  CheckmarkListItemNode,
} from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import {
  $createCheckmarkListNode,
  $isCheckmarkListNode,
} from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListNode'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  type LexicalNode,
  type NodeKey,
  $getRoot,
  $isElementNode,
  $isParagraphNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  LineBreakNode,
  PASTE_COMMAND,
  TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $dfs } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'

const CHECKMARK_RE = /^-\[x\]\s*/i

const isBlank = (node: LexicalNode): boolean => {
  if (!$isParagraphNode(node)) return false
  if (node.isEmpty()) return true
  return node.getChildren().every((c) => c instanceof LineBreakNode)
}

const isCheckmarkParagraph = (node: LexicalNode): boolean => {
  if (!$isParagraphNode(node)) return false
  const first = node.getFirstChild()
  return first instanceof TextNode && CHECKMARK_RE.test(first.getTextContent())
}

const convertToCheckmarkItem = (node: LexicalNode) => {
  if (!$isParagraphNode(node)) return

  const first = node.getFirstChild()
  if (first instanceof TextNode) {
    first.setTextContent(first.getTextContent().replace(CHECKMARK_RE, ''))
  }

  const item = $createCheckmarkListItemNode()
  node.getChildren().forEach((child) => item.append(child))

  const prev = node.getPreviousSibling()
  if ($isCheckmarkListNode(prev)) {
    prev.append(item)
    node.remove()
  } else {
    const list = $createCheckmarkListNode()
    list.append(item)
    node.replace(list)
    $setSelection(list.getLastChild<CheckmarkListItemNode>()?.select() ?? list.select())
  }
}

const cleanLinkSpaces = (node: LexicalNode) => {
  if (!$isElementNode(node) || !node.isInline()) return
  const type = node.getType()
  if (type !== 'link' && type !== 'autolink') return

  // Leading spaces: strip from first text child, push to preceding sibling
  const firstChild = node.getFirstChild()
  if (firstChild instanceof TextNode) {
    const text = firstChild.getTextContent()
    const leading = text.length - text.trimStart().length
    if (leading > 0) {
      const spaces = text.slice(0, leading)
      const remainder = text.slice(leading)
      if (remainder.length === 0) firstChild.remove()
      else firstChild.setTextContent(remainder)
      const prev = node.getPreviousSibling()
      if (prev instanceof TextNode) prev.setTextContent(prev.getTextContent() + spaces)
    }
  }

  // Trailing spaces: strip from last text child, push to following sibling
  const lastChild = node.getLastChild()
  if (lastChild instanceof TextNode) {
    const text = lastChild.getTextContent()
    const trailing = text.length - text.trimEnd().length
    if (trailing > 0) {
      const spaces = text.slice(text.length - trailing)
      const remainder = text.slice(0, text.length - trailing)
      if (remainder.length === 0) lastChild.remove()
      else lastChild.setTextContent(remainder)
      const next = node.getNextSibling()
      if (next instanceof TextNode) next.setTextContent(spaces + next.getTextContent())
    }
  }
}

const cleanWhitespaceInParagraph = (node: LexicalNode) => {
  if (!$isParagraphNode(node)) return
  const children = node.getChildren()
  const lastTextNode = [...children].reverse().find((c) => c instanceof TextNode) ?? null
  for (const child of children) {
    if (!(child instanceof TextNode)) continue
    let text = child.getTextContent()
    text = text.replace(/ {2,}/g, ' ')
    if (child === lastTextNode) text = text.trimEnd()
    if (text === child.getTextContent()) continue
    if (text.length === 0) child.remove()
    else child.setTextContent(text)
  }
}

// A node the paste created, or a block that received new inline children from it.
const isTouched = (node: LexicalNode, before: Set<NodeKey>) =>
  !before.has(node.getKey())
  || ($isElementNode(node)
    && node.getChildren().some((child) => !$isElementNode(child) && !before.has(child.getKey())))

const walk = (parent: LexicalNode, before: Set<NodeKey>) => {
  if (!$isElementNode(parent)) return
  parent
    .getLatest()
    .getChildren()
    .forEach((node) => {
      // untouched nodes are left alone, but pasted content can sit inside them
      if (!isTouched(node, before)) return walk(node, before)

      if (isBlank(node)) {
        if (parent.getChildrenSize() > 1) node.remove()
      } else if (isCheckmarkParagraph(node)) {
        convertToCheckmarkItem(node)
      } else {
        cleanLinkSpaces(node)
        cleanWhitespaceInParagraph(node)
        walk(node, before)
      }
    })
}

const PasteCleanupPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const off = editor.registerCommand(
      PASTE_COMMAND,
      () => {
        // Runs ahead of the paste itself (CRITICAL, returns false), so this is the document as it was before.
        const before = editor
          .getEditorState()
          .read(() => new Set($dfs().map(({ node }) => node.getKey())))
        queueMicrotask(() => {
          editor.update(() => walk($getRoot(), before))
        })
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
    return off
  }, [editor])

  return null
}

export const PasteCleanupClient = createClientFeature({
  plugins: [{ Component: PasteCleanupPlugin, position: 'normal' }],
})
