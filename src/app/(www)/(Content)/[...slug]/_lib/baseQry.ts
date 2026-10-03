import type { Where } from '@/lib/filterBy'
import type { FindOptions, PopulateType, SelectIncludeType } from 'payload'

type BaseQry = Sub<
  FindOptions<'routes', SelectIncludeType>,
  'draft',
  {
    draft?: false | undefined
  }
>

export const baseQry = (url: string, preview?: boolean) => {
  const addtl =
    typeof preview == 'boolean' ?
      preview == true ?
        {
          depth: 2,
          where: {},
          populate: {
            content: { content: true, title: true, subtitle: true, 'other-brow': true },
          },
        }
      : {
          dept: 3,
          where: { 'doc.currentLifecycle.published': { exists: true } },
          populate: {
            content: { contentType: true, currentLifecycle: { published: true } },
            'content-record': {
              snapshot: {
                content: true,
                title: true,
                subtitle: true,
                'other-brow': true,
              },
            },
          } as PopulateType,
        }
    : { where: {}, populate: {} }

  return {
    collection: 'routes',
    limit: 1,
    where: {
      url: { equals: url },
      doc: { exists: true },
      ...addtl.where,
    } as Where<'routes'>,
    select: { type: true, adminTitle: true },
    populate: addtl.populate,
    depth: addtl.depth,
    pagination: false,
  } as BaseQry
}
