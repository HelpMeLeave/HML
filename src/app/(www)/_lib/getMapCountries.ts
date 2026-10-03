import { getPayload } from '@/server/getPayload'

export const getMapCountries = async () => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'countries',
    where: { mapSvgPath: { exists: true } },
    select: { id: true, name: true, mapSvgPath: true },
    pagination: false,
  })
  return docs
}
