import { env } from '@/env'
import type { Config } from '@/payload-types'
import { PayloadSDK } from '@payloadcms/sdk'

export const sdk = new PayloadSDK<Config>({
  baseURL: env.NEXT_PUBLIC_BASE_URL + '/api',
})
