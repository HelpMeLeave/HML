import { tFn } from '@/_config/i18n/'
import { is } from '@/access/is'
import { isDashboard, isUserCollection } from '@/access/URL'
import { columnField, rowField } from '@/collections/_fields/Flex'
import { CheckboxConfig, CheckboxGroupConfig } from '@/collections/_lib/Checkbox'
import { TextConfig } from '@/collections/_lib/Text'
import { deleteUserRoles } from '@/collections/UserCollections/Users/_hooks/deleteUserRoles'
import { parseName } from '@/collections/UserCollections/Users/_hooks/parseName'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { conditionFn } from '@/lib/condition'
import { TimeZone } from '@/lib/getTimezone'
import type { User } from '@/payload-types'
import { DateTime } from 'luxon'
import { type CollectionConfig, baseEmailField, baseUsernameField } from 'payload'
import type { Collection } from 'payload-types'

export const UsersCollectionConfig: CollectionConfig<'users'> = {
  slug: 'users',
  defaultSort: ['_order', 'name'],
  timestamps: true,
  trash: true,
  lockDocuments: false,
  admin: {
    hideAPIURL: true,
    useAsTitle: 'name',
    defaultColumns: ['name', 'discordHandle', 'pronouns'],
    groupBy: true,
  },
  auth: {
    forgotPassword: {},
    tokenExpiration: 2592000,
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true,
    },
    verify: false,
    maxLoginAttempts: 5,
  },
  defaultPopulate: {
    username: true,
    name: true,
    roles: true,
  },
  hooks: {
    beforeChange: [parseName],
    beforeDelete: [deleteUserRoles],
    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          id: user.id,
          collection: 'users',
          data: {
            lastLogin: DateTime.now().toISO(),
          },
          req,
        })
      },
    ],
  },
  access: {
    read: ({ req }) => {
      if (isUserCollection({ req })) return is().Role.ManagerOrSelf({ req })
      if (isDashboard({ req })) return is().Role.Manager({ req })
      return true
    },
    update: is().Role.DirectorOrSelf,
  },
  folders: {
    browseByFolder: true,
  },
  labels: {
    singular: tFn('general:user'),
    plural: tFn('general:users'),
  },
  fields: [
    columnField(
      {
        admin: {
          position: 'sidebar',
          condition: conditionFn().isNotCreate,
        },
      },
      TextConfig('name', {
        tLabel: 'label:displayName',
        required: true,
        description: {
          en: 'The name shown for you throughout the CMS',
          es: 'El nombre que se muestra para usted en todo el CMS',
        },
      }),
      rowField(
        {},
        TextConfig('firstName', {
          condition: conditionFn().isNotCreate,
          tLabel: 'label:firstName',
        }),
        TextConfig('lastName', {
          condition: conditionFn().isNotCreate,
          tLabel: 'label:lastName',
        })
      ),
      TextConfig('pronouns', {
        hasMany: true,
        condition: conditionFn().isNotCreate,
        tLabel: 'label:pronouns',
        description: {
          en: 'Your pronouns/gender expression. Choose as many as you want',
          es: 'Tus pronombres/expresión de género. Elige tantos como quieras.',
        },
        admin: {
          components: {
            Field: '@/collections/UserCollections/Users/_components/field.Pronouns',
            Cell: '@/collections/UserCollections/Users/_components/cell.Pronouns',
          },
        },
      }),
      {
        type: 'select',
        name: 'status',
        label: tFn('label:status'),
        required: true,
        options: [
          {
            value: 'pending',
            label: tFn('label:pending', true),
          },
          {
            value: 'active',
            label: tFn('label:active', true),
          },
          {
            value: 'hiatus',
            label: tFn('label:hiatus', true),
          },
          {
            value: 'inactive',
            label: tFn('label:inactive', true),
          },
        ],
        defaultValue: 'pending',
        admin: {
          readOnly: true,
        },
        access: {
          update: is().Role.Director,
        },
      }
    ),
    {
      type: 'ui',
      name: 'noCreate',
      admin: {
        components: {
          Field: '@/collections/UserCollections/Users/_components/NoCreate/Field',
        },
      },
    },
    {
      ...baseUsernameField,
      admin: {
        ...baseUsernameField.admin,
        condition: conditionFn().isNotCreate,
        components: {
          ...baseUsernameField.admin?.components,
          Cell: '@/collections/UserCollections/Users/_components/cell.Name',
        },
      },
    },
    {
      ...baseEmailField,
      required: false,
      unique: false,
      admin: {
        ...baseEmailField.admin,
        condition: conditionFn().isNotCreate,
      },
    },
    // #region ! ---------- HIDDEN ----------
    {
      type: 'date',
      name: 'lastLogin',
      saveToJWT: true,
      admin: {
        condition: conditionFn().isNotCreate,
        hidden: true,
      },
    },
    {
      type: 'join',
      collection: 'pathways',
      on: 'assignedUsers',
      name: 'pathways',
      label: tFn('title:pathways'),
      admin: {
        hidden: true,
        ...listDisabled,
      },
    },
    // #endregion ! --------------------

    {
      type: 'tabs',
      admin: {
        condition: conditionFn().isNotCreate,
      },
      tabs: [
        {
          label: tFn('title:content'),
          fields: [
            {
              type: 'join',
              collection: 'documents',
              on: 'authors',
              name: 'documents',
              label: tFn('title:documents'),
              admin: {
                allowCreate: false,
              },
            },
          ],
        },
        {
          label: tFn('title:teams'),
          admin: {
            condition: conditionFn().isNotCreate,
          },
          fields: [
            {
              type: 'join',
              collection: 'user-roles',
              on: 'user',
              name: 'roles',
            },
          ],
        },
        {
          label: tFn('label:availability'),
          fields: [
            {
              type: 'row',
              admin: {
                condition: conditionFn().isNotCreate,
              },
              fields: [
                {
                  type: 'json',
                  name: 'weeklyDays',
                  admin: {
                    components: {
                      Field: `@/collections/UserCollections/Users/_components/field.WeeklyDays`,
                    },
                    style: {
                      flexBasis: '50%',
                      flexGrow: 1,
                      flexShrink: 0,
                    },
                  },
                  defaultValue: {
                    M: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    T: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    W: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    Th: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    F: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    S: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                    Su: {
                      morning: false,
                      afternoon: false,
                      evening: false,
                    },
                  },
                },
                {
                  type: 'group',
                  admin: {
                    style: {
                      flexBasis: '300px',
                      flexShrink: 0,
                      flexGrow: 0,
                    },
                  },
                  fields: [
                    {
                      admin: {
                        width: '100%',
                      },
                      name: 'timezone',
                      type: 'select',
                      label: tFn('general:timezone'),
                      options: Intl.supportedValuesOf('timeZone').map((tzString) => {
                        const tz = new TimeZone(tzString)
                        return {
                          label: tz.toString(),
                          value: tz.zone,
                        }
                      }),
                    },
                    {
                      type: 'select',
                      name: 'weeklyHours',
                      options: ['1-3', '3-6', '6-10', '10+'],
                      admin: {
                        description: 'How many hours a week you have the bandwidth to volunteer',
                        width: '100%',
                        style: {
                          flex: '1 0 100%',
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: tFn('pillar:operation'),
          fields: [
            CheckboxGroupConfig(
              'Management',
              [
                {
                  name: 'isManagement',
                  label: 'Holds Management Position',
                  options: {
                    defaultValue: false,
                    admin: {
                      readOnly: false,
                    },
                    saveToJWT: true,
                    access: {
                      read: ({ req: { user } }) => Boolean(user?.isDirector),
                      update: ({ req: { user } }) => Boolean(user?.isDirector),
                    },
                    hooks: {
                      afterRead: [
                        ({ data }) => {
                          if (!data) return
                          return data.isDirector || data.isHead
                        },
                      ],
                    },
                    virtual: true,
                  },
                },
                {
                  name: 'isDirector',
                  label: tFn('title:director'),
                  options: { defaultValue: false },
                },
                {
                  name: 'isHead',
                  label: tFn('title:head'),
                  options: { defaultValue: false },
                },
              ],
              {
                size: 'base',
                direction: 'horizontal',
              }
            ),
            rowField(
              {},
              columnField(
                {
                  label: 'Volunteer Agreement',
                  labelSize: 'base',
                },
                CheckboxConfig('volunteerAgreement', {
                  defaultValue: false,
                  label: 'Signed Volunteer Agreement',
                  admin: {
                    position: 'sidebar',
                    readOnly: true,
                    style: {
                      maxWidth: '200px',
                    },
                  },
                  access: {
                    update: is().Role.Director,
                  },
                }),
                TextConfig('volunteerAgreementSignature', {
                  admin: {
                    hidden: true,
                  },
                  hidden: true,
                  access: {
                    read: is().Role.Director,
                    update: () => false,
                    create: () => false,
                  },
                  saveToJWT: false,
                }),
                {
                  type: 'date',
                  name: 'volunteerAgreementSignedOn',
                  access: {
                    read: () => true,
                    update: () => false,
                    create: () => false,
                  },
                  admin: {
                    ...listDisabled,
                    condition: conditionFn<Collection, AnySafe>({
                      key: 'volunteerAgreement',
                      equals: true,
                    }).siblingDataEq,
                  },
                }
              ),
              columnField(
                {
                  label: 'Discord',
                  labelSize: 'small',
                },
                CheckboxConfig('addedToDiscord', {
                  access: {
                    update: is().Role.Manager,
                  },
                  label: 'Invited to Discord Server',
                  defaultValue: false,
                  admin: {
                    readOnly: true,
                    ...listDisabled,
                  },
                }),
                TextConfig('discordHandle', {
                  label: 'Discord Handle',
                  admin: {
                    condition: conditionFn<User, 'addedToDiscord'>({
                      key: 'addedToDiscord',
                      equals: true,
                    }).siblingDataEq,
                    width: '150px',
                    components: {
                      Cell: '@/collections/UserCollections/Users/_components/cell.Discord',
                    },
                  },
                })
              )
            ),
          ],
        },
      ],
    },
  ],
}
