import type { Field } from 'payload'
import { fieldAffectsData } from 'payload/shared'

export const leafPaths = (fields: Field[], prefix?: string): string[] =>
  fields.flatMap((field) => {
    if (!fieldAffectsData(field) || !field.name) return []

    const path = [prefix, field.name].filter(Boolean).join('.')

    return field.type == 'group' ? leafPaths(field.fields, path) : [path]
  })
