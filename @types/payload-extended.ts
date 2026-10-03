declare module 'payload-types' {
  import type { Config } from '@/payload-types'
  import type { CollectionSlug, FieldBase } from 'payload'

  export type ParamSegments = { segments?: string[] }

  interface RequestContext {
    routeAdminTitle?: string | null
  }

  export type FieldAdmin = Valid<FieldBase['admin']>
  export type Collection<T extends CollectionSlug = CollectionSlug> = Config['collections'][T]

  export type SentenceToCamelCase<S extends string> =
    S extends `${infer First} ${infer Rest}` ? `${Lowercase<First>}${SentenceToPascalCase<Rest>}`
    : Lowercase<S>

  // Helper: Converts the rest of the words to PascalCase (Capitalized)
  export type SentenceToPascalCase<S extends string> =
    S extends `${infer First} ${infer Rest}` ?
      `${Capitalize<Lowercase<First>>}${SentenceToPascalCase<Rest>}`
    : Capitalize<Lowercase<S>>

  // 2. Mapped type to recursively convert entire object keys
  export type CamelizeKeys<T> =
    T extends object ?
      {
        [K in keyof T as K extends string ? SentenceToCamelCase<K> : K]: CamelizeKeys<T[K]>
      }
    : T
}
