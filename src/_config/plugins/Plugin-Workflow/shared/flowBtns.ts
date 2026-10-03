import { isDirector, isNotDirector } from '@/access/_primitives'
import type { FlowBtn, FlowConfig } from 'payload-workflow'

const primaryAdminBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({
    btnLabel,
    btnStyle: 'primary',
    access: isDirector,
    options,
  })

const secondaryAdminBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({
    btnLabel,
    btnStyle: 'secondary',
    access: isDirector,
    options,
  })

const secondaryUserBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({
    btnLabel,
    btnStyle: 'secondary',
    access: isNotDirector,
    options,
  })

const createFlowBtn = ({
  btnLabel,
  btnStyle,
  access,
  options,
}: {
  btnLabel: FlowBtn.Label
  btnStyle: FlowBtn.Style
  access?: FlowBtn.Access
  options?: {
    admin: FlowBtn.AdminBtnProps
  }
}): FlowBtn.BaseBtnProps => ({
  ...options,
  btnLabel,
  btnStyle,
  admin: {
    ...options?.admin,
    access,
  },
})

const rejectUnsubmit: FlowBtn.BaseBtnProps[] = [
  secondaryAdminBtn('Reject', {
    admin: {
      actionKey: 'reject',
      requireNotes: true,
    },
  }),
  secondaryUserBtn('Unsubmit', {
    admin: {
      actionKey: 'unsubmit',
    },
  }),
]

const wipToSubmittedBtn = createFlowBtn({
  btnLabel: 'Submit for Review',
  btnStyle: 'primary',
})

const wipPillLabel = 'Work in Process'
const submittedPillLabel = 'Submitted for Review'
const approvedPillLabel = 'Ready for Publishing'
const scheduledPillLabel = 'Scheduled'

const defaultWip = {
  pillLabel: wipPillLabel,
  submitted: wipToSubmittedBtn,
  // directors can skip review; secondary so Submit stays the main action
  published: secondaryAdminBtn('Publish Now'),
}

const defaultSubmitted = {
  pillLabel: submittedPillLabel,
  wip: rejectUnsubmit,
  approved: primaryAdminBtn('Approve'),
}
const defaultApproved = {
  pillLabel: approvedPillLabel,
  published: primaryAdminBtn('Publish Now'),
  scheduled: secondaryAdminBtn('Schedule Publishing'),
}
const defaultScheduled = {
  pillLabel: scheduledPillLabel,
  published: primaryAdminBtn('Publish Now'),
  approved: secondaryAdminBtn('Unschedule'),
}

export const defaultFlow: FlowConfig = {
  wip: defaultWip,
  submitted: defaultSubmitted,
  approved: defaultApproved,
  scheduled: defaultScheduled,
  published: true,
  deleted: true,
  archived: true,
}
