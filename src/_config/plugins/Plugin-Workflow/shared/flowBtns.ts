import { isDirector, isNotDirector } from '@/access/_primitives'
import type { FlowBtn, FlowConfig } from 'payload-workflow'
import type { CreateFlowBtnProps, ToFlowStatus } from './_types'

const primaryAdminBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({ btnLabel, btnStyle: 'primary', access: isDirector, options })

const secondaryAdminBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({ btnLabel, btnStyle: 'secondary', access: isDirector, options })

const secondaryUserBtn: FlowBtn.CreateBtnPropsFn = (btnLabel, options) =>
  createFlowBtn({ btnLabel, btnStyle: 'secondary', access: isNotDirector, options })

const createFlowBtn = ({
  btnLabel,
  btnStyle,
  access,
  options,
}: CreateFlowBtnProps): FlowBtn.BaseBtnProps => ({
  ...options,
  btnLabel,
  btnStyle,
  admin: { ...options?.admin, access },
})

const btnLabels: Record<ToFlowStatus, string> = {
  toPublished: 'Publish Now',
  toScheduled: 'Schedule Publishing',
  toApproved: 'Approve',
  toArchived: 'Archive',
  toDeleted: 'Delete',
  toSubmitted: 'Submit for Review',
  toWip: 'Save',
}

export const defaultFlow: FlowConfig = {
  wip: {
    pillLabel: 'Work in Process',
    submitted: createFlowBtn({
      btnLabel: btnLabels.toSubmitted,
      btnStyle: 'primary',
    }),
    published: secondaryAdminBtn('Publish Now'),
  },
  submitted: {
    pillLabel: 'Submitted for Review',
    wip: [
      secondaryAdminBtn('Reject', {
        admin: { actionKey: 'reject', requireNotes: true },
      }),
      secondaryUserBtn('Unsubmit', {
        admin: { actionKey: 'unsubmit' },
      }),
    ],
    approved: primaryAdminBtn('Approve'),
  },
  approved: {
    pillLabel: 'Ready for Publishing',
    published: primaryAdminBtn(btnLabels.toPublished),
    scheduled: secondaryAdminBtn(btnLabels.toScheduled),
  },
  scheduled: {
    pillLabel: 'Scheduled',
    published: primaryAdminBtn(btnLabels.toPublished),
    approved: secondaryAdminBtn('Unschedule'),
  },
  published: true,
  deleted: true,
  archived: true,
}
