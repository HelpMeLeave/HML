import { type User, type UsersSelect } from '@/payload-types'
import type { FieldHookArgs } from 'payload'

export const getAuthorStrings = async ({ siblingData, req }: FieldHookArgs) => {
  type RelationValue = { relationTo: string; value: number }

  const names = await Promise.all(
    (siblingData.authors as RelationValue[]).map(async (ea) => {
      if (ea.relationTo == 'teams' || ea.relationTo == 'pillar') {
        const { name } = await req.payload.findByID({
          collection: ea.relationTo,
          id: ea.value,
          select: {
            name: true,
          },
          req,
        })
        return name
      } else {
        const { name } = (await req.payload.findByID<'users', true, UsersSelect>({
          collection: ea.relationTo as 'users',
          id: ea.value,
          select: {
            name: true,
          },
          req,
        })) as User
        return name
      }
    })
  )

  return names.join(', ')
}
