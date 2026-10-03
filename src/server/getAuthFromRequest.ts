import { getPayload } from '@/server/getPayload'

export const getAuthFromRequest = async (req: Request) => {
  const payload = await getPayload()
  return await payload.auth({ headers: req.headers })
}
