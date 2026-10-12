import type { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
import type { CoverUpload, DuotoneFields } from '../_types'
import { isImageMime } from '../presets'

type CoverOfFnReturn =
  | undefined
  | ({
      url: string
    } & Partial<DuotoneFields>)

export const isUpload = (field: CoverUpload | undefined): field is CoverUpload =>
  Boolean(field && field.type == 'upload' && field.value)

type CoverUploadWithDuotone = CoverUpload & {
  fields: DuotoneFields
}

const hasDuotone = (field: CoverUpload): field is CoverUploadWithDuotone =>
  Boolean(field.fields?.duotone)

export const hasDuotoneColor = (
  field?: {
    duotone?: {
      color?: DuotoneFields['duotone']['color'] | null
    } | null
  } | null
): field is DuotoneFields => Boolean(field?.duotone?.color)

export const coverOf = (node: SerializedElementNode): CoverOfFnReturn => {
  const first = node.children?.[0] as CoverUpload | undefined
  if (!isUpload(first)) return
  if (typeof first.value != 'object' || !first.value.url) return
  // if (!hasDuotone(first)) return

  const { url, mimeType } = first.value ?? {}
  const duotone = hasDuotone(first) ? first.fields.duotone : undefined

  if (url && isImageMime(mimeType)) return { url, duotone }
}
