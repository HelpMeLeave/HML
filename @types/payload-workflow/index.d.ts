declare module 'payload-workflow' {
  import type { User, WorkflowRecordSlug } from '@/payload-types'
  import type { NamedGroupField, SingleRelationshipField } from 'payload'

  // #region ! ---------- type FLOW CONFIG ----------
  type PillLabel = true | string

  type SubFlow<K extends FlowSTATUS> = {
    [SubKey in Exclude<FlowSTATUS, K>]?: FlowBtn.BaseBtnProps | FlowBtn.BaseBtnProps[]
  }

  type FlowStep<K extends FlowSTATUS> =
    K extends FlowSTATUS_WITHOUT_STEPS ? PillLabel : SubFlow<K> & { pillLabel: PillLabel }

  type FlowConfig = {
    [Key in FlowSTATUS]?: FlowStep<Key>
  }

  // #endregion ! --------------------

  // #region ! ---------- type LIFECYCLE ----------
  type WorkflowRecordsField = SingleRelationshipField & {
    hasMany: true
    relationTo: WorkflowRecordSlug
    name: 'records'
  }
  type WorkflowPublishedField = SingleRelationshipField & {
    hasMany: false
    relationTo: WorkflowRecordSlug
    name: 'published'
  }

  type WorkflowLifecycleField = Omit<NamedGroupField, 'name' | 'fields'> & {
    name: 'currentLifecycle'
    fields: [WorkflowRecordsField, WorkflowPublishedField]
  }
  // #endregion ! --------------------

  // #region ! ---------- type BUTTON ----------
  type ButtonAccess = (user: User | null) => boolean
  // #endregion ! --------------------
}
