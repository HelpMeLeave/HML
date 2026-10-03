import { FLOW_STATUSES } from '@/_config/plugins/Plugin-Workflow/_lib/constants'
import { listDisabled } from '@/lib/collectionAdminSwitches'
import { toTitleCase } from '@/lib/textCasing'
import type { WorkflowRecordSlug } from '@/payload-types'
import type { CollectionConfig, Field } from 'payload'
import type { Flow, FlowOption, WorkflowCollection } from 'payload-workflow'
import { fieldIsID } from 'payload/shared'

/**
 * The two fields the plugin puts on an opted-in collection.
 *
 * Takes the statuses already derived at binding rather than the raw flow, so the canonical order is worked out once and everything downstream agrees with it.
 */
export const setBaseFields = ({
  collection,
  initStatus,
  statusOptions,
  recordSlug,
  hasSidebarFields,
}: {
  collection: WorkflowCollection.PreprocessedConfig
  initStatus: Flow.STATUS
  statusOptions: FlowOption[]
  recordSlug: WorkflowRecordSlug
  hasSidebarFields: boolean[]
}) => {
  const position = hasSidebarFields.length > 0 ? 'sidebar' : 'main'
  const baseAcces = collection.access
  if (!baseAcces) {
    collection.access = {} as Valid<CollectionConfig['access']>
  }

  const fields: Field[] = [
    {
      type: 'group',
      admin: {
        className: 'p-0',
        position,
        hideGutter: true,
        hidden: true,
      },
      fields: [
        {
          type: 'select',
          name: 'flow',
          options: statusOptions,
          defaultValue: initStatus,
          typescriptSchema: [
            ({ jsonSchema }) => ({
              ...jsonSchema,
              enum: FLOW_STATUSES,
            }),
          ],
          required: true,
          admin: {
            components: {
              Cell: '@/_config/plugins/Plugin-Workflow/_components/Pill/Cell',
            },
            readOnly: true,
            position,
            description:
              'Where this document currently sits in its review flow. Moved by the workflow controls, not by hand.',
          },
        },
        {
          type: 'text',
          name: 'transitionTo',
          virtual: true,
          admin: {
            ...listDisabled,
            hidden: true,
            description:
              'Set by the workflow controls to request a transition on save. Never stored.',
          },
          typescriptSchema: [
            ({ jsonSchema }) => ({
              ...jsonSchema,
              enum: FLOW_STATUSES,
              required: false,
            }),
          ],
        },
        {
          type: 'text',
          name: 'actionKey',
          virtual: true,
          admin: {
            ...listDisabled,
            hidden: true,
            description:
              'Set alongside `transitionTo` when the edge offers several affordances. Never stored — it lands on the entry as `transition.actionKey`.',
          },
        },
        {
          type: 'textarea',
          name: 'transitionNote',
          virtual: true,
          admin: {
            ...listDisabled,
            hidden: true,
            description:
              'Set alongside `transitionTo` when the affordance declares `requireNotes`. Never stored — it lands on the entry as `notes`.',
          },
        },
      ],
    },
    {
      name: 'currentLifecycle',
      type: 'group',
      interfaceName: `${toTitleCase(collection.slug)}Lifecycle`,
      admin: {
        ...listDisabled,
        hidden: true,
        position,
        className: 'p-0',
      },
      fields: [
        {
          type: 'relationship',
          name: 'records',
          relationTo: recordSlug,
          hasMany: true,
          admin: {
            description: 'Every history entry for this document.',
          },
        },
        {
          type: 'relationship',
          name: 'published',
          relationTo: recordSlug,
          hasMany: false,
          admin: {
            description:
              'The entry that put the live content in place. Publishing moves this pointer.',
          },
        },
        {
          type: 'checkbox',
          name: 'locked',
          defaultValue: false,
          admin: {
            description:
              'Locks editing on document outside of the button actions for the key the lock is on',
          },
        },
        {
          type: 'group',
          name: 'changed',
          admin: {
            className: 'p-0',
          },
          fields: [
            { type: 'date', name: 'at' },
            { type: 'relationship', name: 'by', relationTo: 'users' },
          ],
        },
      ],
    },
  ]

  const idIndex = collection.fields.findIndex(fieldIsID)
  if (idIndex > 0) collection.fields.unshift(...collection.fields.splice(idIndex, 1))

  collection.fields.splice(idIndex === -1 ? 0 : 1, 0, ...fields)
}
