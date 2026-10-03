import { pluginWorkflowPermissions } from '@/_config/plugins/Plugin-Workflow'
import { FlowControlsClient } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/index.client'
import type {
  FlowButton,
  FlowPermissionAnswers,
} from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import type { WorkflowCollectionSlug } from '@/payload-types'
import type { ServerProps } from 'payload'
import type { Flow } from 'payload-workflow'

/**
 * The document's transitions, resolved on the server.
 *
 * `buttons` arrive already built — worked out once at boot from a config that never changes. The only per-request work here is answering the gates for this user, because those are the one thing that depends on who is asking.
 */
const FlowControls = async ({
  id,
  user,
  buttons,
  slug,
  pillLabels,
  permissions: payloadPermissions,
}: ServerProps & {
  buttons: Record<Flow.STATUS, FlowButton[]>
  slug: WorkflowCollectionSlug
  pillLabels: Record<Flow.STATUS, string>
}) => {
  // Nothing to transition until the document exists.
  if (!user) return null
  const canCreate = payloadPermissions?.collections?.[slug].create ?? false
  const idIsNull = id == null

  if ((idIsNull && !canCreate) || !user) return null

  const permissions = {} as FlowPermissionAnswers

  for (const [from, byTo] of Object.entries(pluginWorkflowPermissions[slug] ?? {})) {
    const fromKey = from as Flow.STATUS
    permissions[fromKey] ??= {} as FlowPermissionAnswers[Flow.STATUS]

    for (const [to, declared] of Object.entries(byTo ?? {}))
      permissions[fromKey][to as Flow.STATUS] =
        typeof declared == 'function' ?
          Boolean(declared(user))
        : Object.fromEntries(
            Object.entries(declared ?? {}).map(([key, gate]) => [key, Boolean(gate(user))])
          )
  }

  return (
    <FlowControlsClient
      slug={slug}
      buttons={buttons}
      permissions={permissions}
      pillLabels={pillLabels}
      canCreate={canCreate}
      idIsNull={idIsNull}
    />
  )
}

export default FlowControls
