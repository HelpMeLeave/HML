import type { FlowButton } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import type { Flow, WorkflowCollection } from 'payload-workflow'

/**
 * Sets base collection components
 */
export const setBaseComponents = ({
  collection,
  buttons,
  locksAt,
  pillLabels,
}: {
  collection: WorkflowCollection.PreprocessedConfig
  locksAt?: Flow.LocksAt
  /** Sent down as data. The client picks the set for the current status rather than deriving it from the flow config. */
  buttons: Record<Flow.STATUS, FlowButton[]>
  pillLabels: Record<Flow.STATUS, string>
}) => {
  collection.admin = {
    ...collection.admin,
    components: {
      ...collection.admin?.components,
      edit: {
        ...collection.admin?.components?.edit,
        beforeDocumentControls: [DocControls({ locksAt, collection, buttons, pillLabels })],
        // Archive and Delete, for widths where the controls row is hidden.
        // Hidden until a flow declares edges into archived/deleted — the hook now refuses undeclared moves, so these could only error.
        // TODO: editMenuItems: [EditMenuPopup({ slug: collection.slug })],
        SaveButton: '@/_components/views/Empty' as ToDo,
      },
    },
  }
}

const DocControls = ({
  collection,
  buttons,
  locksAt,
  pillLabels,
}: {
  collection: WorkflowCollection.PreprocessedConfig
  buttons: Record<Flow.STATUS, FlowButton[]>
  locksAt?: Flow.LocksAt
  pillLabels: Record<Flow.STATUS, string>
}) => ({
  path: '@/_config/plugins/Plugin-Workflow/_components/FlowControls',
  serverProps: {
    slug: collection.slug,
    pillLabels,
    buttons,
    locksAt,
  },
})

const _EditMenuPopup = ({ slug }: { slug: string }): ToDo => {
  return {
    path: '@/_config/plugins/Plugin-Workflow/_components/FlowEditMenu',
    serverProps: { slug },
    clientProps: { slug },
  }
}
