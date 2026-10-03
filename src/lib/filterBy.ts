import type {
  CollectionSlug,
  FilterOptions,
  GeneratedTypes,
  Where as PayloadWhere,
  WhereField,
} from 'payload'

type WhereKeys<T extends CollectionSlug> = keyof GeneratedTypes['collections'][T] | 'and' | 'or'

export type Where<T extends CollectionSlug> = PayloadWhere
  & FilterOptions
  & Partial<Record<WhereKeys<T>, Partial<WhereField>>>

export const filterMedia = {
  byType: (...type: string[]): Where<'media'> => ({
    and: type.map((t) => ({
      mimeType: {
        like: t,
      },
    })),
  }),
}
