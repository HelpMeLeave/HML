import { COUNTRY_ISO3 } from '@/lib/constants/COUNTRY_ISO'
import type { Where } from '@/lib/filterBy'
import { getPayload } from '@/server/getPayload'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = 'https://www.helpmeleave.us'
  const setPath = (...paths: string[]) => [baseURL, ...paths].join('/')

  const payload = await getPayload()

  const { docs: routeDocs } = await payload.find({
    collection: 'routes',
    where: {
      'doc.currentLifecycle.published': { exists: true },
    } as Where<'routes'>,
    select: {
      url: true,
    },
    pagination: false,
  })

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...COUNTRY_ISO3.map((iso) => ({
      url: setPath('countries', iso.toLowerCase()),
      lastModified: new Date(),
      changeFrequency: 'monthly' as
        'monthly' | 'yearly' | 'always' | 'hourly' | 'daily' | 'weekly' | 'never' | undefined,
      priority: 0.8,
    })),
    ...routeDocs.map(({ url }) => ({
      url: setPath(url),
      lastModified: new Date(),
      changeFrequency: 'monthly' as
        'monthly' | 'yearly' | 'always' | 'hourly' | 'daily' | 'weekly' | 'never' | undefined,
      priority: 0.8,
    })),
  ]
}
