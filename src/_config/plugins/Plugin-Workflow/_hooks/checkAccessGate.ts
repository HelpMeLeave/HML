import type { OnSaveHookProps } from '@/_config/plugins/Plugin-Workflow/_hooks/onSave'
import { pickGate } from '@/_config/plugins/Plugin-Workflow/_lib/pickGate'
import type { PayloadRequest } from 'payload'
import type { Flow } from 'payload-workflow'

export const checkAccessGate = ({
  permissions,
  from,
  requested,
  actionKey,
  req,
}: {
  permissions: OnSaveHookProps['permissions']
  from: Flow.STATUS
  requested: Flow.STATUS
  actionKey?: string | null
  req: PayloadRequest
}) => {
  // same lookup the client's button filter uses; here the gate is a function to call
  const gate = pickGate({ permissions, from, to: requested, actionKey })
  return gate ? gate(req.user) : true
}
