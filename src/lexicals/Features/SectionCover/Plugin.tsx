'use client'

import {
  $getCover,
  $isCaretAfterCover,
  $normalizeCover,
  OPEN_COVER_DRAWER_COMMAND,
} from '@/lexicals/Features/SectionCover/_lib'
import {
  $isSectionHGroupNode,
  SectionHGroupNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import type { UploadData } from '@payloadcms/richtext-lexical'
import { $createUploadNode, useLexicalListDrawer } from '@payloadcms/richtext-lexical/client'
import {
  $getNodeByKey,
  $getSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  KEY_BACKSPACE_COMMAND,
  type NodeKey,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useCallback, useEffect, useState } from 'react'
import './style.scss'

export const SectionCoverPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [targetKey, setTargetKey] = useState<NodeKey | null>(null)

  const { ListDrawer, openListDrawer, closeListDrawer } = useLexicalListDrawer({
    collectionSlugs: ['media-content'],
    uploads: true,
  })

  useEffect(
    () =>
      editor.registerCommand(
        OPEN_COVER_DRAWER_COMMAND,
        (key) => {
          setTargetKey(key)
          openListDrawer()
          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
    [editor, openListDrawer]
  )

  useEffect(() => editor.registerNodeTransform(SectionHGroupNode, $normalizeCover), [editor])

  useEffect(
    () =>
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        (event) => {
          const valid = $isCaretAfterCover($getSelection())
          if (valid) {
            event?.preventDefault()
          }

          return valid
        },
        COMMAND_PRIORITY_CRITICAL
      ),
    [editor]
  )

  const onSelect = useCallback(
    ({ collectionSlug, doc }: { collectionSlug: string; doc: Record<string, unknown> }) => {
      closeListDrawer()

      editor.update(() => {
        const hgroup = targetKey ? $getNodeByKey(targetKey) : null

        if (!$isSectionHGroupNode(hgroup)) return

        const existing = $getCover(hgroup)
        if (existing) {
          existing.setData({
            ...existing.getData(),
            relationTo: collectionSlug,
            value: doc.id,
          } as UploadData)
          return
        }

        const cover = $createUploadNode({
          data: { fields: {}, relationTo: collectionSlug, value: doc.id } as UploadData,
        })
        hgroup.splice(0, 0, [cover])
      })
    },
    [closeListDrawer, editor, targetKey]
  )

  return <ListDrawer onSelect={onSelect} />
}
