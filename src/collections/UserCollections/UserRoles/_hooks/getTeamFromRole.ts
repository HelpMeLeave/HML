import { normalizeCollectionID } from '@/lib/normalize'
import type { Pillar, Team, UserRole } from '@/payload-types'
import type { CollectionAfterReadHook } from 'payload'

export const getTeamFromRole: CollectionAfterReadHook<UserRole> = async ({ doc, req }) => {
  const { role } = doc
  let pillar, team
  if (typeof role == 'number') {
    const data = await req.payload.findByID({
      collection: 'roles',
      id: role,
      select: {
        pillar: true,
        team: true,
      },
      depth: 1,
    })

    doc.pillarNameString = (data.pillar ?? [])?.map((ea) => (ea as Pillar).name) as string[]
    doc.teamNameString = (data.team ?? [])?.map((ea) => (ea as Team).name) as string[]
    doc.pillar = (data.pillar ?? [])?.map((ea) => normalizeCollectionID(ea)) as number[]
    doc.team = (data.team ?? [])?.map((ea) => normalizeCollectionID(ea)) as number[]
    return
  } else {
    team = !role?.team ? null : role.team
    pillar = !role?.pillar ? null : role.pillar
  }

  if (pillar) doc.pillar = pillar
  doc.team = team
}
