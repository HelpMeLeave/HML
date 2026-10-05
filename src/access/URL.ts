import { user } from '@/access/_lib/usr'
import { isDirector } from '@/access/_primitives'
import type { UrlOrArgs } from '@/access/_types'
import { env } from '@/env'
import type { FieldAccessArgs } from 'payload'

const adminUrl = [env.NEXT_PUBLIC_BASE_URL, env.ADMIN_PATH].join('')

export const isDashboard = (url: UrlOrArgs) => Boolean(reqUrl(url)?.endsWith(`${env.ADMIN_PATH}`))

const Dashboard = (args: FieldAccessArgs) => isDirector(user(args)) || isDashboard(args)
export const NotDashboard = (args: FieldAccessArgs) => !Dashboard(args)

export const isUserCollection = (url: UrlOrArgs) =>
  Boolean(reqUrl(url)?.includes('collections/users'))
export const UserCollection = (args: FieldAccessArgs) =>
  isDirector(user(args)) || !isUserCollection(args)

export const CMS = (args: FieldAccessArgs) => reqUrl(args).startsWith(adminUrl)

const reqUrl = (args: UrlOrArgs) => (typeof args == 'string' ? args : (args.req.url ?? ''))
