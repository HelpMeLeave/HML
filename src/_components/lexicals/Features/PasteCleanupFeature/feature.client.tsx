'use client'

import { $createCheckmarkListItemNode } from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
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
  $isLineBreakNode,
  $isParagraphNode,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  PASTE_COMMAND,
  TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $dfs } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'

const CHECKMARK_RE = /^-\[x\]\s*/i

const isBlank = (node: LexicalNode): boolean =>
  !$isParagraphNode(node) ? false
  : node.isEmpty() ? true
  : node.getChildren().every($isLineBreakNode)

const isCheckmarkParagraph = (node: LexicalNode): boolean => {
  if (!$isParagraphNode(node)) return false

  const first = node.getFirstChild()
  return $isTextNode(first) && CHECKMARK_RE.test(first.getTextContent())
}

const convertToCheckmarkItem = (node: LexicalNode) => {
  if (!$isParagraphNode(node)) return

  const first = node.getFirstChild()

  $isTextNode(first) && first.setTextContent(first.getTextContent().replace(CHECKMARK_RE, ''))

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

    const lastChild = list.getLastChild()

    $isCheckmarkListNode(lastChild) ?
      $setSelection(lastChild.select())
    : $setSelection(list.select())
  }
}

const cleanLinks = (node: LexicalNode) => {
  if (!$isElementNode(node) || !node.isInline()) return
  if (!['link', 'autolink'].includes(node.getType())) return

  const firstChild = node.getFirstChild()

  const handleRemainder = (node: TextNode, remainder: string) => {
    if (remainder.length === 0) {
      node.remove()
    } else {
      node.setTextContent(remainder)
    }
  }

  if (firstChild instanceof TextNode) {
    if (firstChild.hasFormat('underline')) {
      firstChild.toggleFormat('underline')
    }
    const text = firstChild.getTextContent()
    const leading = text.length - text.trimStart().length

    if (leading > 0) {
      const spaces = text.slice(0, leading)

      handleRemainder(firstChild, text.slice(leading))

      const prev = node.getPreviousSibling()

      if ($isTextNode(prev)) {
        prev.setTextContent(prev.getTextContent() + spaces)
      }
    }
  }

  // Trailing spaces: strip from last text child, push to following sibling
  const lastChild = node.getLastChild()
  if ($isTextNode(lastChild)) {
    const text = lastChild.getTextContent()
    const trailing = text.length - text.trimEnd().length
    const trailingSpaces = text.length - trailing

    if (trailing > 0) {
      const spaces = text.slice(trailingSpaces)

      handleRemainder(lastChild, text.slice(0, trailingSpaces))

      const next = node.getNextSibling()

      if ($isTextNode(next)) {
        next.setTextContent(spaces + next.getTextContent())
      }
    }
  }
}

const cleanWhitespaceInParagraph = (node: LexicalNode) => {
  if (!$isParagraphNode(node)) return
  const children = node.getChildren()

  const lastTextNode = [...children].reverse().find((c) => $isTextNode(c)) ?? null

  const initText = (child: TextNode) => child.getTextContent().replace(/ {2,}/g, ' ')

  for (const child of children) {
    if (!$isTextNode(child)) continue

    const text = child === lastTextNode ? initText(child).trimEnd() : initText(child)

    if (text === child.getTextContent()) {
      continue
    }

    text.length === 0 ? child.remove() : child.setTextContent(text)
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
      if (!isTouched(node, before)) return walk(node, before)

      if (isBlank(node)) {
        parent.getChildrenSize() > 1 && node.remove()
      } else if (isCheckmarkParagraph(node)) {
        convertToCheckmarkItem(node)
      } else {
        cleanLinks(node)
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
