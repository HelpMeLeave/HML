import { isUpload } from '@/lexicals/Features/Duotone/_lib/isUpload'
import type { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
import type { CoverUpload, DuotoneFields } from '../_types'

export const isImageMime = (mime: unknown) => typeof mime == 'string' && mime.startsWith('image/')

type CoverOfFnReturn = {
  url: string
} & Partial<DuotoneFields>

export const coverOf = (node: SerializedElementNode): CoverOfFnReturn | undefined => {
  const first = node.children?.[0] as CoverUpload | undefined
  if (!isUpload(first)) return
  if (typeof first.value != 'object' || !first.value.url) return

  const { url, mimeType } = first.value ?? {}

  if (url && isImageMime(mimeType)) return { url, duotone: first.fields.duotone }
}
