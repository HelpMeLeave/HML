'use client'

import {
  $getCover,
  $headingChars,
  $isCaretAfterCover,
  $normalizeCover,
  OPEN_COVER_DRAWER_COMMAND,
} from '@/lexicals/Features/SectionCover/_lib'
import {
  $isSectionHGroupNode,
  SectionHGroupNode,
} from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import { duotoneChipVars } from '@/lexicals/Features/Duotone/_lib/duotoneChipVars'
import type { DuotoneFields } from '@/lexicals/Features/Duotone/_types'
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
import { $dfs } from '@payloadcms/richtext-lexical/lexical/utils'
import { useCallback, useEffect, useState } from 'react'

// Classes each hgroup child takes while the hgroup has a cover
const coverRoles: Record<string, string[]> = {
  'section-heading': ['chip', 'fit-text'],
  'section-eyebrow': ['chip', 'order-1'],
  'section-subtitle': ['overlay-below'],
}

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

  useEffect(() => {
    const $sync = (hgroup: SectionHGroupNode) => {
      const el = editor.getElementByKey(hgroup.getKey())
      const chars = $headingChars(hgroup)
      if (!el) return
      if (chars) el.style.setProperty('--chars', String(chars))
      else el.style.removeProperty('--chars')

      const cover = $getCover(hgroup)
      const duotone = (cover?.getData().fields as Partial<DuotoneFields> | undefined)?.duotone
      el.classList.toggle('overlay', Boolean(cover))
      el.toggleAttribute('data-cover', Boolean(cover))
      if (duotone?.position) el.dataset.position = duotone.position
      else delete el.dataset.position

      const chip = cover ? duotoneChipVars(duotone?.color) : undefined
      for (const prop of ['--chip-bg', '--chip-text'] as const) {
        const value = chip?.[prop]
        if (value) el.style.setProperty(prop, value)
        else el.style.removeProperty(prop)
      }

      if (cover) editor.getElementByKey(cover.getKey())?.classList.add('overlay-media')
      for (const child of hgroup.getChildren()) {
        const childEl = editor.getElementByKey(child.getKey())
        for (const role of coverRoles[child.getType()] ?? []) childEl?.classList.toggle(role, Boolean(cover))
      }
    }

    editor
      .getEditorState()
      .read(() => $dfs().forEach(({ node }) => $isSectionHGroupNode(node) && $sync(node)))

    return editor.registerUpdateListener(({ editorState, dirtyElements }) =>
      editorState.read(() => {
        for (const key of dirtyElements.keys()) {
          const node = $getNodeByKey(key)
          if ($isSectionHGroupNode(node)) $sync(node)
        }
      })
    )
  }, [editor])

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
