import { DuotoneFilters } from '@/lexicals/Features/Duotone/_components/DuotoneFilters'
import { DuotoneSwatches } from '@/lexicals/Features/Duotone/_components/DuotoneSwatches'
import { editorCSS } from '@/lexicals/Features/Duotone/_lib/editorCSS'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import { savedTweaks } from '@/lexicals/Features/Duotone/_lib/savedTweaks'
import type {
  DuotoneFields,
  DuotonePosition,
  DuotoneThemedColor,
  DuotoneTweakFields,
} from '@/lexicals/Features/Duotone/_types'
import {
  $isUploadNode,
  UploadNode,
  useEditorConfigContext,
} from '@payloadcms/richtext-lexical/client'
import {
  $getNodeByKey,
  type LexicalEditor,
  type NodeMutation,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useFormFields } from '@payloadcms/ui'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { getDuotonePreset } from './_lib/getDuotonePreset'

type Cover = {
  el: HTMLElement
  id?: string
  color?: DuotoneThemedColor
  tweaks?: DuotoneTweakFields
  position?: DuotonePosition
  isCover?: boolean
}
type Covers = Record<string, Cover>

const readEditor = (editor: LexicalEditor, mutations: Map<string, NodeMutation>) => {
  const next: Covers = {} as Covers

  editor.getEditorState().read(() => {
    for (const [key, mutation] of mutations) {
      if (mutation == 'destroyed') continue
      const node = $getNodeByKey(key)
      const el = editor.getElementByKey(key)
      if (!el || !$isUploadNode(node)) continue

      const duotone = (node.getData().fields as DuotoneFields | null)?.duotone
      const preset = getDuotonePreset(duotone?.color ?? duotone)

      if (preset) {
        el.dataset.duotone = preset.value
        el.style.setProperty('--duotone-filter', duotoneFilter(preset.value, duotone))
      } else {
        delete el.dataset.duotone
        el.style.removeProperty('--duotone-filter')
      }

      if (duotone?.position) el.dataset.position = duotone.position
      else delete el.dataset.position

      if (node.getData().relationTo == 'media-content')
        next[key] = {
          el,
          id: node.getData().id,
          color: preset?.value,
          tweaks: duotone,
          position: duotone?.position,
          isCover: el.parentElement?.tagName == 'HGROUP',
        }
    }
  })

  return next
}

export const DuotonePreviewPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [covers, setCovers] = useState<Covers>({})
  const { path } = useEditorConfigContext().fieldProps
  const initialValue = useFormFields(([fields]) => fields[path]?.initialValue)
  const saved = useMemo(() => savedTweaks(initialValue), [initialValue])

  useEffect(
    () =>
      editor.registerMutationListener(UploadNode, (mutations) => {
        const next: Covers = readEditor(editor, mutations)
        setCovers((prev) => {
          const merged = { ...prev }
          for (const [key] of mutations) delete merged[key]
          return { ...merged, ...next }
        })
      }),
    [editor]
  )

  return (
    <>
      <DuotoneFilters />
      <style>{editorCSS}</style>
      {Object.entries(covers).map(([key, { el, id, color, tweaks, position, isCover }]) =>
        createPortal(
          <DuotoneSwatches
            editor={editor}
            nodeKey={key}
            color={color}
            tweaks={tweaks}
            position={position}
            isCover={isCover}
            saved={id ? saved[id] : undefined}
          />,
          el,
          key
        )
      )}
    </>
  )
}
