'use client'

import { $backspaceAtBodyStart } from '@/lexicals/Features/RichListItem/_lib/backspaceAtBodyStart'
import { $enterAtBodyEnd } from '@/lexicals/Features/RichListItem/_lib/enterAtBodyEnd'
import { $normalizeRichListItem } from '@/lexicals/Features/RichListItem/_lib/normalizeRichListItem'
import {
  $isRichListItem,
  // $normalizeRichListItem,
  RichListItemBodyNode,
  RichListItemNode,
  RichListItemTitleNode,
} from '@/lexicals/Features/RichListItem/nodes'
import {
  $createParagraphNode,
  COMMAND_PRIORITY_HIGH,
  KEY_BACKSPACE_COMMAND,
  KEY_ENTER_COMMAND,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $unwrapNode, mergeRegister } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'
import './style.scss'

export const RichListItemPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      mergeRegister(
        editor.registerNodeTransform(RichListItemNode, $normalizeRichListItem),
        editor.registerNodeTransform(RichListItemTitleNode, (node) => {
          if (!$isRichListItem(node.getParent())) node.replace($createParagraphNode(), true)
        }),
        editor.registerNodeTransform(RichListItemBodyNode, (node) => {
          if (!$isRichListItem(node.getParent())) $unwrapNode(node)
        }),
        editor.registerCommand(KEY_ENTER_COMMAND, $enterAtBodyEnd, COMMAND_PRIORITY_HIGH),
        editor.registerCommand(KEY_BACKSPACE_COMMAND, $backspaceAtBodyStart, COMMAND_PRIORITY_HIGH)
      ),
    [editor]
  )

  return null
}
