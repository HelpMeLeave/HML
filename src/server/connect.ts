import configPromise from '@/_config/payload.config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const payloadConnect = cache(async (withTransaction: boolean = false) => {
  const payload = await getPayload({ config: configPromise })
  return withTransaction ?
      {
        transactionID: await payload.db.beginTransaction(),
        payload,
      }
    : {
        payload,
      }
})
