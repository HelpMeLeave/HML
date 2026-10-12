import type { DocumentGroup, FieldCustomLayout } from '@/payload-types'
import type { StaticLabel } from 'payload'
import type { ReplacerField, ReplacerFieldType } from 'payload-fields'

declare module 'payload' {
  interface CollectionCustom {
    navGroup?: DocumentGroup
    flags?:
      | boolean
      | {
          collectionSlug: string
          type?: 'default' | 'lg' | 'xl'
          field?: {
            required?: boolean
            label?: StaticLabel | boolean | undefined
            name: string
          }
        }
  }

  interface FieldCustom {
    track?: boolean
    locked?: boolean
    flag?: boolean
    layout?: FieldCustomLayout
    replacer?: ReplacerField<ReplacerFieldType> & { type: ReplacerFieldType }
  }

  export type ParamSegments = { segments?: string[] }
}
