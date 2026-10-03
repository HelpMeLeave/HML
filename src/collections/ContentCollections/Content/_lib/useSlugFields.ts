'use client'

import { useFormFields } from '@payloadcms/ui'
import type { FieldState } from 'payload'

/**
 * Shared subscription for the title/slug pair. Both the Title field and the Slug field read the same three paths and write to them together, so the selector lives here.
 *
 * `fields[path]` is typed as a bare `FieldState`, but form state is partial in drawers and bulk edit — the widening to `FieldState | undefined` is the honest shape. The `*Value` helpers narrow `value` (typed `unknown`) with real type guards so callers get usable primitives, while the raw field states stay available for spreading into `UPDATE_MANY`, which replaces rather than merges.
 */
export const useSlugFields = () => {
  const { slugGeneratedField, titleField, slugField, dispatch } = useFormFields(
    ([fields, dispatch]) => ({
      slugGeneratedField: fields.slugGenerated as FieldState | undefined,
      titleField: fields.title as FieldState | undefined,
      slugField: fields.slug as FieldState | undefined,
      dispatch,
    })
  )

  return {
    dispatch,
    slugField,
    slugGeneratedField,
    titleField,
    slugGenerated: slugGeneratedField?.value === true,
    slugValue: typeof slugField?.value === 'string' ? slugField.value : '',
    titleValue: typeof titleField?.value === 'string' ? titleField.value : '',
  }
}
