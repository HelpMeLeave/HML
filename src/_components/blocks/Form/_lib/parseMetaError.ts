import type { AnyFieldMeta } from '@tanstack/react-form'

export const parseMetaError = (meta: AnyFieldMeta) =>
  meta.isTouched ? meta.errors[0]?.toString() : undefined
