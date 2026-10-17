import type { FlowBtn, FlowSTATUS } from 'payload-workflow'

export type ToFlowStatus = `to${Capitalize<FlowSTATUS>}`

export type CreateFlowBtnProps = {
  btnLabel: FlowBtn.Label
  btnStyle: FlowBtn.Style
  access?: FlowBtn.Access
  options?: { admin: FlowBtn.AdminBtnProps }
}
