import type { PathwayCategory, PathwayDocumentType } from '@/payload-types'
import type { FieldHookArgs } from 'payload'
import { slugify } from 'payload/shared'

// Builds `parent-path/own-slug` for a collection that nests into itself through `parent`.
// Pathway categories and document types had the same copy, differing only in the collection they looked the parent up in.
export const createPathHook =
  (collection: 'pathway-categories' | 'pathway-document-types') =>
  async ({ data, req }: FieldHookArgs<PathwayCategory | PathwayDocumentType>) => {
    if (!data) return
    let parentPath: string | null | undefined
    let parent: Partial<PathwayCategory | PathwayDocumentType> | number | null = data.parent ?? null

    if (parent) {
      if (typeof parent == 'number') {
        parent = await req.payload.findByID({
          collection,
          id: parent,
          select: {
            path: true,
          },
        })
      }
      parentPath = parent.path
    }

    data.path = [parentPath, slugify(data.title)?.replace('--', '-')].filter(Boolean).join('/')
  }
