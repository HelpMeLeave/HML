import { DuotoneFilters } from '@/lexicals/Features/Duotone/_components/DuotoneFilters'
import { DuotoneSwatches } from '@/lexicals/Features/Duotone/_components/DuotoneSwatches'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import {
  duotoneChipVars,
  duotoneFilterStyle,
  getDuotonePreset,
} from '@/lexicals/Features/Duotone/presets'
import {
  $isUploadNode,
  UploadNode,
  useEditorConfigContext,
} from '@payloadcms/richtext-lexical/client'
import { $getNodeByKey } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useFormFields } from '@payloadcms/ui'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { DUOTONES } from './_lib/DUOTONES'
import type { DuotoneTweaks } from './_lib/filter'
import { savedTweaks } from './_lib/savedTweaks'
import type { DuotoneFields, DuotoneThemed } from './_types'

const editorCss = DUOTONES.map(({ value }) => {
  const upload = `.lexical-upload[data-duotone='${value}']`

  const chip = Object.entries(duotoneChipVars(value) ?? {})
    .map(([k, v]) => `${k}:${v}`)
    .join(';')

  return (
    `${upload} img{filter:var(--duotone-filter,${duotoneFilterStyle(value)})}`
    + (chip && `:has(> ${upload}:first-child){${chip}}`)
  )
}).join('')

/** Mirrors each upload node's duotone preset and cover position onto its DOM element for CSS. SectionCover's layout rules read data-position from here. */
export const DuotonePreviewPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [covers, setCovers] = useState<
    Record<string, { el: HTMLElement; id?: string; color?: DuotoneThemed; tweaks?: DuotoneTweaks }>
  >({})
  const { path } = useEditorConfigContext().fieldProps
  const initialValue = useFormFields(([fields]) => fields[path]?.initialValue)
  const saved = useMemo(() => savedTweaks(initialValue), [initialValue])

  useEffect(
    () =>
      editor.registerMutationListener(UploadNode, (mutations) => {
        const next: typeof covers = {}
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
              next[key] = { el, id: node.getData().id, color: preset?.value, tweaks: duotone }
          }
        })
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
      <style>{editorCss}</style>
      {Object.entries(covers).map(([key, { el, id, color, tweaks }]) =>
        createPortal(
          <DuotoneSwatches
            editor={editor}
            nodeKey={key}
            color={color}
            tweaks={tweaks}
            saved={id ? saved[id] : undefined}
          />,
          el,
          key
        )
      )}
    </>
  )
}
