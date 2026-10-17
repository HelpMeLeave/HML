import type { Where } from '@/lib/filterBy'
import type { FindOptions, SelectIncludeType } from 'payload'

type BaseQry = Sub<
  FindOptions<'routes', SelectIncludeType>,
  'draft',
  {
    draft?: false | undefined
  }
>

export const baseQry = (url: string) => {
  return {
    collection: 'routes',
    limit: 1,
    where: {
      url: { equals: url },
      doc: { exists: true },
    } as Where<'routes'>,
    populate: { content: { init: true } },
    select: { type: true, adminTitle: true },
    pagination: false,
  } as BaseQry
}
