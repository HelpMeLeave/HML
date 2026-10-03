'use client'
import type { BtnFnProps } from '@/_config/plugins/Plugin-Workflow/_components/FlowControls/_types'
import type { FlowPermissionAnswers } from '@/_config/plugins/Plugin-Workflow/_lib/parseFlow'
import { pickGate } from '@/_config/plugins/Plugin-Workflow/_lib/pickGate'
import type { Flow } from 'payload-workflow'

/**
 * Whether this user can perform the edge action.
 */
export const createAllowanceCheck = ({
  permissions,
  from,
}: {
  permissions: FlowPermissionAnswers
  from: Flow.STATUS
}) => {
  // same lookup the server's check uses; here the gate is already answered
  return ({ to, actionKey }: BtnFnProps) => pickGate({ permissions, from, to, actionKey }) ?? true
}
