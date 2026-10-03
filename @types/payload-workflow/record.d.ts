import type { User, WorkflowRecordSlug } from '@/payload-types'
import type {
  CheckboxField,
  CollectionConfig,
  DateField,
  Field,
  JSONField,
  NamedGroupField,
  SingleRelationshipField,
  TextField,
} from 'payload'

type RecordDetailBaseFields = [
  DateField & {
    name: 'at'
  },
  SingleRelationshipField & {
    name: 'by'
  },
  CheckboxField & {
    name: 'system'
  },
]

declare module 'payload-workflow' {
  type FlowRecord = {
    baseId: number | string
    entry: {
      kind: 'transition' | 'snapshot'
      at: Date
      by?: User
      system: boolean
    }
    transition?: RecordTransition
    notes?: string[]
    snapshot?: unknown // the mirrored field group
  }

  type TransitionActionKey = string
  type TransitionSubmittedActionKey = TransitionActionKey & ('rejected' | 'unsubmitted')

  type RecordTransitionSubmitted = RecordTransitionAction<
    'submitted',
    'wip',
    TransitionSubmittedActionKey
  >

  type RecordTransition<F extends Flow.STATUS = Flow.STATUS, T extends Flow.STATUS = Flow.STATUS> =
    F extends 'submitted' ? RecordTransitionSubmitted : RecordTransitionBase<F, T>

  type RecordTransitionAction<
    F extends Flow.STATUS,
    T extends Flow.STATUS,
    K extends TransitionActionKey,
  > = RecordTransitionBase<F, T> & { key: K }

  type RecordTransitionBase<
    F extends Flow.STATUS = Flow.STATUS,
    T extends Flow.STATUS = Flow.STATUS,
  > = { from: F; to: T; snapshotReference?: FlowRecord }
  // #endregion ! --------------------
}

// #region ! ---------- CONFIG ----------
declare module 'payload-workflow' {
  type WorkflowRecordConfig = CollectionConfig<WorkflowRecordSlug> & {
    slug: WorkflowRecordSlug
    defaultPopulate?: CollectionConfig['defaultPopulate']
    forceSelect?: CollectionConfig['forceSelect']
    fields: [
      TextField & {
        name: 'title'
      },
      Field & {
        name: 'baseId'
        hasMany: false
      },
      WorkflowRecordChangeConfig,
      WorkflowRecordTransitionConfig,
      TextField,
      NamedGroupField & {
        name: 'snapshot'
      },
      JSONField & {
        name: '_options'
      },
    ]
  }

  type WorkflowRecordChangeConfig = NamedGroupField & {
    name: 'change'
    fields: RecordDetailBaseFields
  }

  type WorkflowRecordTransitionConfig = NamedGroupField & {
    name: 'transition'
    fields: [
      ...RecordDetailBaseFields,
      TextField & {
        name: 'from'
      },
      TextField & {
        name: 'to'
      },
      TextField & {
        name: 'actionKey'
      },
    ]
  }
}

// #endregion ! --------------------
