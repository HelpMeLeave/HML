import { headers as getHeaders } from 'next/headers'
import type { BasePayload } from 'payload'

export const checkUsers = async (payload: BasePayload) =>
  (await payload.auth({ headers: await getHeaders() }))?.user
