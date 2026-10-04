import type { Flow, FlowBtn } from 'payload-workflow'

export type ToFlowStatus = `to${Capitalize<Flow.STATUS>}`

export type CreateFlowBtnProps = {
  btnLabel: FlowBtn.Label
  btnStyle: FlowBtn.Style
  access?: FlowBtn.Access
  options?: { admin: FlowBtn.AdminBtnProps }
}
