import { env } from '@/env'
import type { PayloadRequest } from 'payload'

/** The page URL for a content doc in preview mode, from its route (which includes parent paths). */
export const previewURL = async (id: unknown, req: PayloadRequest) => {
  if (typeof id != 'number' && typeof id != 'string') return null

  const { docs } = await req.payload.find({
    collection: 'routes',
    where: { doc: { equals: id } },
    select: { url: true },
    depth: 0,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    req,
  })

  return docs[0]?.url ? `${env.NEXT_PUBLIC_BASE_URL}/${docs[0].url}?preview` : null
}
