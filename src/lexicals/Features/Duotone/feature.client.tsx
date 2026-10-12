'use client'

import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import { DuotoneFilters } from '@/lexicals/Features/Duotone/DuotoneFilters'
import {
  duotoneChipVars,
  duotoneFilterStyle,
  getDuotonePreset,
} from '@/lexicals/Features/Duotone/presets'
import { $isUploadNode, createClientFeature, UploadNode } from '@payloadcms/richtext-lexical/client'
import { $getNodeByKey } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { DUOTONES } from './_lib/DUOTONES'
import type { DuotoneFields } from './_types'

const editorCss = DUOTONES.map(({ value }) => {
  const upload = `.lexical-upload[data-duotone='${value}']`

  const chip = Object.entries(duotoneChipVars(value) ?? {})
    .map(([k, v]) => `${k}:${v}`)
    .join(';')

  return (
    `${upload} img{filter:var(--duotone-filter,${duotoneFilterStyle(value)})}`
    // `${upload} img{filter:${duotoneFilterStyle(value)}}`
    + (chip && `:has(> ${upload}:first-child){${chip}}`)
  )
}).join('')

/** Mirrors each upload node's duotone preset and cover position onto its DOM element for CSS. SectionCover's layout rules read data-position from here. */
const DuotonePreviewPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      editor.registerMutationListener(UploadNode, (mutations) => {
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
            // if (preset) el.dataset.duotone = preset.value
            // else delete el.dataset.duotone

            if (duotone?.position) el.dataset.position = duotone.position
            else delete el.dataset.position
          }
        })
      }),
    [editor]
  )

  return (
    <>
      <DuotoneFilters />
      <style>{editorCss}</style>
    </>
  )
}

export default createClientFeature({
  plugins: [{ Component: DuotonePreviewPlugin, position: 'normal' }],
})
