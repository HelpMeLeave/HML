'use client'

import { useEditorConfigContext } from '@payloadcms/richtext-lexical/client'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useFormInitializing, useFormProcessing } from '@payloadcms/ui'
import { useEffect } from 'react'

/** Payload sets `editable` only on the editor's first render, so an editor mounted while the form is still initializing stays read-only. */
export const EditableSyncPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const { fieldProps } = useEditorConfigContext()
  const initializing = useFormInitializing()
  const processing = useFormProcessing()

  const readOnly =
    fieldProps.readOnly || fieldProps.field?.admin?.readOnly || initializing || processing

  useEffect(() => editor.setEditable(!readOnly), [editor, readOnly])

  return null
}
