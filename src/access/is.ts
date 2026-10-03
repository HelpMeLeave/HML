import { truthy } from '@/access/_lib/truthy'
import { isUsr, user } from '@/access/_lib/usr'
import { isDirector, isHead, isManager, isSelf } from '@/access/_primitives'
import type { IsFnProps } from '@/access/_types'
import { isPillar, isTeam } from '@/access/PillarTeam'
import { CMS, NotDashboard, UserCollection } from '@/access/URL'
import { env } from '@/env'
import type { FieldAccessArgs } from 'payload'

const isAdmin = ({ req: { url } }: FieldAccessArgs) =>
  Boolean(url?.startsWith(env.NEXT_PUBLIC_BASE_URL + env.ADMIN_PATH))

export const is = (props?: IsFnProps) => ({
  Self: (args: FieldAccessArgs) => truthy(isSelf(user(args), false)),
  Team: (args: FieldAccessArgs) => isTeam(args.req, props?.team),
  NotDashboard,
  UserCollection,
  User: isUsr,
  Bri: (args: FieldAccessArgs) => isUsr(args) && Boolean(user(args)?.id == 1),
  NotBri: (args: FieldAccessArgs) => isUsr(args) && Boolean(user(args)?.id != 1),
  CMS,
  Pillar: {
    Marketing: (args: FieldAccessArgs) => isPillar(user(args), 'Marketing'),
    Operations: (args: FieldAccessArgs) => isPillar(user(args), 'Operations'),
  },
  Role: {
    Head: (args: FieldAccessArgs) => isHead(user(args)),
    Manager: (args: FieldAccessArgs) => isManager(user(args)),
    ManagerOrSelf: (args: FieldAccessArgs) => isManager(user(args)) || isSelf(user(args)),
    Director: (args: FieldAccessArgs) => isDirector(user(args)),
    DirectorOrSelf: (args: FieldAccessArgs) => isDirector(user(args)) || isSelf(user(args)),
    Self: (args: FieldAccessArgs) => isSelf(user(args)),
  },
  Location: {
    Admin: (args: FieldAccessArgs) => isAdmin(args),
    NotAdmin: (args: FieldAccessArgs) => is().Bri(args) || !isAdmin(args),
  },
})
