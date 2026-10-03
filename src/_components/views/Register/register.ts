'use server'

import type { InitRole } from '@/_components/views/Register'
import type { FormEntryData } from '@/_components/views/Register/_types'
import { toArray } from '@/lib/normalize/to'
import { getPayload } from '@/server/getPayload'

export const register = async (
  data: FormEntryData & {
    initRole?: InitRole
  }
) => {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'user-invitations',
    where: { token: { equals: data.token } },
    limit: 1,
  })

  if (!docs.length) throw new Error('Invalid invitation token')

  const transactionID = await payload.db.beginTransaction()
  if (transactionID) {
    try {
      const newUser = await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: {
          status: 'active',
          email: data.email,
          username: data.username,
          password: data.password.newPassword,
          name: data.name ?? data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          pronouns: data.pronouns,
          discordHandle: data.discordHandle,
          volunteerAgreement: true,
          volunteerAgreementSignedOn: data.date,
          volunteerAgreementSignature: data.signature,
          isDirector: false,
          isHead: false,
        },
        select: {},
        req: { transactionID },
      })

      if (!newUser) {
        throw Error('Unable to create user')
      }

      console.log(`New User Created: ${JSON.stringify(newUser)}`)

      const deleted = await payload.delete({
        collection: 'user-invitations',
        where: { token: { equals: data.token } },
        req: { transactionID },
      })

      if (!deleted) {
        console.log(`Unable to delete User Invitation token: ${data.token}`)
      }

      if (data.initRole) {
        const created = await payload.create({
          collection: 'user-roles',
          data: {
            ...data.initRole,
            pillar: toArray(data.initRole.pillar),
            team: toArray(data.initRole.team),
            user: newUser.id,
          },
          req: { transactionID },
        })
        if (!created) {
          throw Error('')
        }
      }
    } catch (e) {
      payload.logger.fatal(e)
    } finally {
      await payload.db.commitTransaction(transactionID)
    }
  }

  return
}
