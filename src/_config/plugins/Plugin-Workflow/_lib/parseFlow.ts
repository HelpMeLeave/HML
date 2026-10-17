import { FLOW_STATUSES } from '@/_config/plugins/Plugin-Workflow/_lib/constants'
import { isFlowStatus } from '@/_config/plugins/Plugin-Workflow/_lib/is'
import { isRecord } from '@/lib/normalize/is'
import { toTitleCase } from '@/lib/textCasing'
import type { ButtonAccess, FlowBtn, FlowConfig, FlowOption, FlowSTATUS } from 'payload-workflow'

// #region ! ---------- TYPES ----------
export type FlowButton = FlowBtn.BaseBtnProps & {
  to: FlowSTATUS
  btnLabel: string
}
export type FlowPermissions = Record<
  FlowSTATUS,
  Record<FlowSTATUS, ButtonAccess | Record<string, ButtonAccess>>
>
export type FlowPermissionAnswers = Record<
  FlowSTATUS,
  Record<FlowSTATUS, boolean | Record<string, boolean>>
>
// #endregion ! --------------------

// #region ! ---------- LIB ----------
const setPillLabelFrom = (step: FlowConfig[FlowSTATUS], from: FlowSTATUS) => {
  const label = isRecord(step) ? step.pillLabel : step
  return typeof label == 'string' ? label : toTitleCase(from)
}

const sortButtons = (buttons: FlowButton[], from: FlowSTATUS) => {
  return buttons.sort((a, b) => {
    const rank = (to: FlowSTATUS) => {
      const index = FLOW_STATUSES.indexOf(to)
      return index > FLOW_STATUSES.indexOf(from) ? index : index + FLOW_STATUSES.length
    }

    return rank(a.to) - rank(b.to)
  })
}

const setKeyed = ({
  permissions,
  button,
  from,
  to,
  access,
}: {
  permissions: FlowPermissions
  button: FlowBtn.BaseBtnProps
  from: FlowSTATUS
  to: FlowSTATUS
  access: ButtonAccess
}) => {
  const keyed = (permissions[from][to] ??= {}) as Record<string, ButtonAccess>

  keyed[button.admin?.actionKey ?? to] = access
}

const pushFrom = ({
  buttons,
  from,
  button,
  to,
}: {
  buttons: Record<FlowSTATUS, FlowButton[]>
  from: FlowSTATUS
  button: FlowBtn.BaseBtnProps
  to: FlowSTATUS
}) => {
  buttons[from].push({
    ...button,
    to,
    btnLabel: button?.btnLabel ?? toTitleCase(to),
  })
}
// #endregion ! --------------------

export const parseFlow = (flow: FlowConfig) => {
  const statuses = FLOW_STATUSES.filter((status) => flow[status] != null)

  const buttons = {} as Record<FlowSTATUS, FlowButton[]>
  const permissions = {} as FlowPermissions
  const pillLabels = {} as Record<FlowSTATUS, string>

  for (const from of statuses) {
    const step = flow[from]
    buttons[from] = []

    pillLabels[from] = setPillLabelFrom(step, from)

    if (!isRecord(step)) continue

    for (const [to, declared] of Object.entries(step)) {
      if (!isFlowStatus(to)) continue

      const many = Array.isArray(declared)

      for (const button of (many ? declared : [declared]) as FlowBtn.BaseBtnProps[]) {
        const access = button?.admin?.access
        delete button.admin?.access

        pushFrom({ button, buttons, from, to })

        if (!access) continue

        permissions[from] ??= {} as FlowPermissions[FlowSTATUS]

        if (!many) {
          permissions[from][to] = access
          continue
        }

        setKeyed({ permissions, from, to, access, button })
      }
    }

    sortButtons(buttons[from], from)
  }

  return {
    statuses,
    initStatus: statuses[0],
    statusOptions: statuses.map((value) => ({
      label: toTitleCase(value) as Capitalize<FlowSTATUS>,
      value,
    })) as FlowOption[],
    buttons,
    permissions,
    pillLabels,
  }
}
