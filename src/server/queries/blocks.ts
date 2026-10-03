import { getPayload } from '@/server/getPayload'
import type { Where } from 'payload'

export const pageGroupBlockRouter = async (filterQuery: Where[], routeQueries: number[]) => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'content',
    where: {
      or: [
        ...filterQuery,
        {
          route: {
            in: [...new Set(routeQueries)],
          },
        },
      ],
      'currentLifecycle.published': {
        exists: true,
      },
    },
    // every match, not Payload's default first 10
    limit: 0,
    pagination: false,
    populate: {
      routes: {
        url: true,
      },
      'content-record': {
        snapshot: true,
      },
    },
  })

  return docs.map((ea) => ({
    ...ea,
    url: (ea.route?.docs?.[0] as { id: number; url: string }).url,
  }))
}
