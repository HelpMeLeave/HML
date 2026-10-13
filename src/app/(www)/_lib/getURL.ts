import { env } from '@/env.client'

export const getClientSideAdminURL = (...path: string[]) => {
  return [env.NEXT_PUBLIC_BASE_URL, 'admin', ...path].join('/')
}
