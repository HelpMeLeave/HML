import type { Where } from '@/lib/filterBy'
import type { Team, TeamsSelect, User } from '@/payload-types'
import { getPayload } from '@/server/getPayload'
import type { BasePayload, CollectionSlug, JoinQuery, PayloadRequest } from 'payload'
import { extractID } from 'payload/shared'

const createWhere = <TSlug extends CollectionSlug>(args: Where<TSlug>) => args

export const teamRouter = ({ payload, req }: { payload?: BasePayload; req?: PayloadRequest }) => {
  const db = async () => (payload = payload ?? req?.payload ?? (await getPayload()))

  return {
    getTeamFromName: async (
      team: string,
      options?: { select?: TeamsSelect; join?: JoinQuery<'teams'> }
    ) => {
      const payload = await db()
      const { docs } = await payload.find({
        collection: 'teams',
        where: {
          name: {
            equals: team,
          },
        },
        select: options?.select,
        disableErrors: true,
        req,
      })
      return docs
    },
    checkUser: async (user: User | number, team: Team | number | string) => {
      const payload = await db()

      const whereUser = createWhere<'users'>({
        user: { equals: user },
      })

      if (typeof team == 'string') {
        whereUser.teamNameString = { equals: team }
      } else {
        whereUser.team = { equals: extractID(team) }
      }

      const { docs } = await payload.find({
        collection: 'users',
        where: whereUser,
        req,
      })
      return docs
    },
  }
}
