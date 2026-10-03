import { getPayload } from '@/server/getPayload'

export const countryStaticParams = async () => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'countries',
    select: {
      id: true,
    },
    pagination: false,
  })
  return docs.map((country) => ({ country: country.id.toLowerCase() }))
}
