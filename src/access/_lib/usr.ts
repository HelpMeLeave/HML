import { truthy } from '@/access/_lib/truthy'
import type { UsrArgs } from '@/access/_types'
import type { FieldAccessArgs } from 'payload'

export const user = (args: UsrArgs) => args.req.user
export const isUsr = (args: FieldAccessArgs) => truthy(user(args))
