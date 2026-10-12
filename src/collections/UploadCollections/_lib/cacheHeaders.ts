import type { UploadConfig } from 'payload'

export const cacheHeaders: UploadConfig['modifyResponseHeaders'] = ({ headers }) => {
  headers.set(
    'Cache-Control',
    'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400'
  )
  return headers
}
