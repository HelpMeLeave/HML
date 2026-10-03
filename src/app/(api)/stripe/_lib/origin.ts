import { env } from '@/env'
import { headers } from 'next/headers'

export const origin = async () => {
  const h = await headers()
  return (
    h.get('origin') ?? `${env.NODE_ENV === 'development' ? 'http' : 'https'}://${h.get('host')}`
  )
}
