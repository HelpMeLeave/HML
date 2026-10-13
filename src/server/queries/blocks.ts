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
    depth: 1,
    select: {
      title: true,
      subtitle: true,
      content: true,
      authorString: true,
      contentType: true,
      type: true,
      route: true,
      authors: true,
    },
    populate: {
      routes: {
        url: true,
      },
      tag: {
        title: true,
        display: true,
      },
      users: { name: true },
      pillar: { name: true },
      teams: { name: true },
    },
  })

  return docs.map((ea) => ({
    ...ea,
    url: (ea.route?.docs?.[0] as { id: number; url: string }).url,
  }))
}
