import { leafPaths } from '@/_config/plugins/Plugin-Workflow/_lib/paths'
import { parseTrack } from '@/_config/plugins/Plugin-Workflow/track/filter'
import { mirrorFields } from '@/_config/plugins/Plugin-Workflow/track/mirror'
import { toTitleCase } from '@/lib/textCasing'
import type { WorkflowRecordSlug } from '@/payload-types'
import type {
  FlowOptionsCollector,
  WorkflowCollection,
  WorkflowRecordConfig,
} from 'payload-workflow'
import { fieldIsID } from 'payload/shared'

/**
 * Build the record collection that holds one collection's history.
 *
 * Schema only. What gets written into it, and when, is the write path's job — this answers "what shape does an entry have".
 */
export const buildRecordCollection = (base: {
  collection: WorkflowCollection.PreprocessedConfig
  recordSlug: WorkflowRecordSlug
}) => {
  const slug = base.collection.slug
  // One caser for every interface name below, rather than four calls with the same argument.
  const prefix = toTitleCase(slug)

  const collector: FlowOptionsCollector = { flow: [] }
  const hasSidebarFields: boolean[] = []

  const idFieldType = base.collection.fields.find(fieldIsID)?.type == 'text' ? 'text' : 'number'

  // The base's own id is Payload's, not content — a frozen copy has its own.
  const snapshot = mirrorFields({
    fields: base.collection.fields.filter((field) => !fieldIsID(field)),
    collector,
    filter: parseTrack(base.collection.custom!.workflow!.track),
    path: '',
    hasSidebarFields,
  })

  const recordCollection: WorkflowRecordConfig = {
    slug: base.recordSlug,
    timestamps: false,
    admin: {
      defaultColumns: ['title', 'change', 'transition'],
      useAsTitle: 'title',
      group: false,
    },
    defaultPopulate: {
      baseId: true,
      change: true,
      transition: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        index: true,
        admin: {
          readOnly: true,
          description:
            'What the document was called when this state was written, and when. Frozen with the entry, so renaming the document later does not rewrite its history.',
        },
      },
      {
        type: idFieldType,
        name: 'baseId',
        required: true,
        index: true,
        hasMany: false,
        admin: {
          description:
            'Which document this belongs to, as a scalar. Survives whatever happens to the base row.',
        },
      },
      {
        name: 'change',
        type: 'group',
        interfaceName: `${prefix}RecordChange`,
        admin: {
          description:
            'Who wrote the content in this entry, and when. Only on entries carrying a snapshot.',
        },
        fields: [
          { type: 'date', name: 'at', index: true },
          {
            type: 'relationship',
            name: 'by',
            relationTo: 'users',
            hasMany: false,
            index: true,
            admin: {
              description: 'The user who authored this state',
            },
          },
          {
            type: 'checkbox',
            name: 'system',
            defaultValue: false,
            admin: {
              description:
                'Nobody was authenticated when this state was written. A category rather than a gap.',
            },
          },
        ],
      },
      {
        name: 'transition',
        type: 'group',
        interfaceName: `${prefix}RecordTransition`,
        admin: {
          description:
            'Who moved the document and where to. Only on entries recording a transition.',
        },
        fields: [
          { type: 'date', name: 'at', index: true },
          {
            type: 'relationship',
            name: 'by',
            relationTo: 'users',
            hasMany: false,
            index: true,
            admin: {
              description: 'The user who moved it — not necessarily its author',
            },
          },
          {
            type: 'checkbox',
            name: 'system',
            defaultValue: false,
            admin: {
              description:
                'A predetermined system trigger moved it. Allows non-user transitions while still protecting the trail.',
            },
          },
          {
            type: 'text',
            name: 'from',
            index: true,
            admin: {
              description: 'Starting status',
            },
          },
          {
            type: 'text',
            name: 'to',
            index: true,
            admin: {
              description: 'Ending status',
            },
          },
          {
            type: 'text',
            name: 'actionKey',
            index: true,
            admin: {
              description:
                'If a transition can be caused by a multitude of actions, this key gives more context',
            },
          },
        ],
      },
      {
        // A reason left with a decision. Free text so it can't be invalidated later.
        type: 'text',
        name: 'notes',
        hasMany: true,
      },
      {
        name: 'snapshot',
        type: 'group',
        interfaceName: `${prefix}Snapshot`,
        admin: {
          description: 'Only on edit/update entries. The fields. Includes the changes',
        },
        fields: snapshot,
      },
      {
        name: '_options',
        type: 'json',
        admin: {
          disabled: true,
          description:
            'Mirrored selects had when this was written, so a stored value still reads as what it meant at the time.',
        },
        defaultValue: collector,
      },
    ],
  }

  return {
    recordCollection,
    collector,
    // Both halves of `track`, answered by the same walk: what gets copied, and what counts as a change.
    trackedPaths: leafPaths(snapshot),
    hasSidebarFields,
  }
}
