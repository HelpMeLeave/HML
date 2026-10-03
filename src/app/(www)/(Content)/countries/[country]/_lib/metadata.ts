import { getPayload } from '@/server/getPayload'
import type { Metadata } from 'next'

export const countryMetadata = async ({
  params,
}: PageProps<'/countries/[country]'>): Promise<Metadata> => {
  const { country } = await params
  const payload = await getPayload()
  const doc = await payload.findByID({
    collection: 'countries',
    id: country.toUpperCase(),
    select: {
      name: true,
    },
  })

  return {
    title: doc.name,
  }
}
