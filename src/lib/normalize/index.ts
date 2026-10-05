import { toTitleCase } from '@/lib/textCasing'
import type { OptionObject } from 'payload'
import { extractID } from 'payload/shared'

export const normalizeCollectionID = (entry?: { id: number } | number | null | undefined) =>
  entry ? extractID(entry) : -1

export const normalizeAdminPath = (path: string | string[] | null) => {
  if (!path) return ''
  const segments = (
    Array.isArray(path) ?
      path.flatMap((p) => String(p).split('/'))
    : path.split('/')).filter(Boolean)
  const base = '/admin'
  return [base, ...segments, ''].join('/').trim()
}

export const normalizeSelectOptions = (...values: string[]): OptionObject[] =>
  values.map((ea) => ({
    label: toTitleCase(ea),
    value: ea,
  }))
