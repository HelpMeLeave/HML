import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { columnField } from '@/collections/_fields/Flex'
import { RoleRelationField } from '@/collections/_fields/relationTo'
import { PillarTeamRow } from '@/collections/UserCollections/PillarTeamRow'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { randomUUID } from 'crypto'
import type { CollectionConfig } from 'payload'

const UserInvitationsCollectionConfig: CollectionConfig<'user-invitations'> = {
  slug: 'user-invitations',
  endpoints: [
    {
      path: '/register/:token',
      method: 'get',
      handler: async (req) => {
        const { routeParams } = req
        const {
          docs: [user],
        } = await req.payload.find({
          collection: 'user-invitations',
          where: {
            token: {
              equals: routeParams,
            },
          },
          disableErrors: true,
        })
        if (user) {
          return Response.json({ body: user })
        }
        return Response.json({ error: 'Invalid Token' }, { status: 404 })
      },
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
  timestamps: true,
  access: {
    read: ({ req }) => {
      if (req.user) {
        return is().Role.Manager({ req })
      }
      return true
    },
    create: is().Role.Manager,
    delete: is().Role.Director,
    update: () => false,
  },
  fields: [
    columnField(
      {},

      {
        type: 'text',
        name: 'name',
        required: true,
      },
      {
        type: 'json',
        name: 'initRole',
        admin: {
          ...listDisabled,
          hidden: true,
        },
      },
      PillarTeamRow,
      RoleRelationField({
        virtual: true,
        admin: {
          readOnly: false,
        },
      }),

      {
        name: 'token',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          readOnly: true,
          components: {
            Field: '@/collections/UserCollections/Invitations/_components/RegisterKey',
          },
        },
      }
    ),
  ],
  labels: {
    singular: tFn('title:userInvitations'),
    plural: tFn('title:userInvitations'),
  },
  hooks: {
    beforeChange: [
      ({ operation, data, context }) => {
        if (!data) return
        if (operation == 'create') {
          data.token = randomUUID()
        }
        if (context && !('initRole' in context)) {
          data.initRole = {
            role: data.role,
            pillar: data.pillar,
            team: data.team,
          }
          context.initRole = true
        }
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc?.initRole) return
        const { pillar, role, team } = doc.initRole
        doc.pillar = pillar
        doc.role = role
        doc.team = team
      },
    ],
  },
}

export default UserInvitationsCollectionConfig
