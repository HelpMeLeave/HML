import { flattenTeamNames } from '@/access/_lib/flattenTeamNames'
import { getPillarFromName } from '@/access/_lib/getPillarFromName'
import { isCollection } from '@/access/_lib/isCollection'
import { isDirector } from '@/access/_primitives'
import type { User, UserRole } from '@/payload-types'
import type { PayloadRequest } from 'payload'

export const isPillar = (user: Pick<User, 'roles' | 'isDirector'> | null, pillar?: string) => {
  if (!user) return false
  if (!user.roles?.docs || !pillar) return false

  return isCollection<UserRole>(user.roles.docs) ?
      user.roles.docs.filter((d) => d.pillar.includes(getPillarFromName(pillar ?? '')?.id ?? -1))
        .length > 0 || isDirector(user)
    : false
}

export const isTeam = async (req: PayloadRequest, team?: string) => {
  const { user } = req
  if (isDirector(user)) return true
  if (!req || !user?.roles?.docs || !team) return false

  return isCollection<UserRole>(user.roles.docs) ?
      flattenTeamNames(user.roles.docs).includes(team.toLowerCase())
    : false
}
