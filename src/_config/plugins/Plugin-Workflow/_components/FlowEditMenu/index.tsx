import { FlowEditMenuClient } from '@/_config/plugins/Plugin-Workflow/_components/FlowEditMenu/index.client'
import type { WorkflowCollectionSlug } from '@/payload-types'
import type { EditMenuItemsServerProps } from 'payload'

/**
 * Archive and Delete, for widths where the controls row is hidden.
 *
 * Both are ordinary statuses, so these should press the same way every other affordance does — writing `transitionTo` and submitting. Not wired yet: the flow config declares no edges into them, so there is nothing to press toward.
 */
const FlowEditMenu = ({
  slug,
  permissions,
}: EditMenuItemsServerProps & { slug: WorkflowCollectionSlug }) => {
  const { delete: remove } = permissions?.collections?.[slug] ?? {}
  return <FlowEditMenuClient remove={Boolean(remove)} />
}

export default FlowEditMenu
