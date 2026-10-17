import type { FlowSTATUS } from 'payload-workflow'

export type BtnFnProps = {
  to: FlowSTATUS
  actionKey?: string
  transitionNote?: string
}
