import type { User, WorkflowRecordSlug } from '@/payload-types'
import type { NamedGroupField, SingleRelationshipField } from 'payload'

declare module 'payload-workflow' {
  // #region ! ---------- type FLOW CONFIG ----------

  /**
   * `true` indicates using the same value as the status in string form
   * IE: { published: true } uses the label "Published"
   */
  type PillLabel = true | string

  type SubFlow<K extends Flow.STATUS> = {
    [SubKey in Exclude<Flow.STATUS, K>]?: FlowBtn.BaseBtnProps | FlowBtn.BaseBtnProps[]
  }

  type FlowStep<K extends Flow.STATUS> =
    K extends Flow.STATUS_WITHOUT_STEPS ? PillLabel : SubFlow<K> & { pillLabel: PillLabel }

  type FlowConfig = {
    [Key in Flow.STATUS]?: FlowStep<Key>
  }

  // #endregion ! --------------------
}

declare module 'payload-workflow' {
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
}

declare module 'payload-workflow' {
  // #region ! ---------- BUTTON ----------

  type ButtonAccess = (user: User | null) => boolean

  // #endregion ! --------------------
}

declare module 'payload' {
  interface CollectionCustom {
    workflow?: Config.Obj
  }

  interface RequestContext {
    workflow?: {
      bySystem?: boolean
      transition?: boolean
      data: {
        from: Flow.STATUS
        to: Flow.STATUS
        key?: string
      }
    }
  }
}
