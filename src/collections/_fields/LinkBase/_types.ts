import type { RelationshipData } from '@payloadcms/richtext-lexical'
import type { CollectionSlug, FilterOptions, RelationshipField, TextField } from 'payload'

export type LinkFieldDocOptions = {
  collections?: CollectionSlug[]
  filterOptions?: FilterOptions
  admin?: RelationshipField['admin']
  name?: string
  label?: RelationshipField['label']
  appearance?: Valid<RelationshipField['admin']>['appearance']
}

export type LinkFieldNameOptions = {
  name: string
  required?: boolean
} & Partial<Omit<TextField, 'hasMany' | 'maxRows' | 'minRows' | 'validate' | 'name'>>

export type LinkField = {
  linkType: 'internal' | 'external' | 'custom'
  doc?: Nullish<RelationshipData>
  url?: string | null
  newTab?: boolean | null
}
export type ValidLinkField = { url: string } | { doc: RelationshipData }
