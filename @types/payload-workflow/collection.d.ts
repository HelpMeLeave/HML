import type { User, WorkflowCollectionSlug } from '@/payload-types'
import type { Button } from '@payloadcms/ui/elements/Button'
import type { IconName } from 'lucide-react/dynamic'
import type { CollectionConfig, Field, TypedCollectionSelect } from 'payload'

// #region ! ---------- BTN OMITTED ----------
type BtnOmitted =
  | 'to'
  | 'buttonStyle'
  | 'btnLabel'
  | 'children'
  | 'enableSubMenu'
  | 'onClick'
  | 'onMouseDown'
  | 'programmaticSubmit'
  | 'Link'
  | 'SubMenuPopupContent'
  | 'secondaryActions'
  | 'icon'
// #endregion ! --------------------

type RawCollectionConfig = Omit<CollectionConfig, 'fields' | 'custom'>

declare module 'payload-workflow' {
  namespace WorkflowCollection {
    type PreprocessedConfig = CollectionConfig & {
      custom: {
        workflow: Config.Obj
      }
    }

    type Config = RawCollectionConfig & {
      custom: {
        workflow: Config.Obj
      }
      fields: Fields
    }

    type Fields = [FlowStatusField, WorkflowLifecycleField, ...Field[]]
  }

  namespace Config {
    type Flow = FlowConfig

    type Obj<TSlug extends WorkflowCollectionSlug = WorkflowCollectionSlug> = {
      _init?: true
      track: true | true | TypedCollectionSelect[TSlug]
      flow: Flow
      locksAt?: Flow.LocksAt
    }
  }

  namespace Flow {
    type STATUS =
      'wip' | 'submitted' | 'approved' | 'scheduled' | 'published' | 'deleted' | 'archived'
    type STATUS_WITHOUT_STEPS = Exclude<STATUS, 'wip' | 'submitted' | 'approved' | 'scheduled'>

    type LocksAt = STATUS | STATUS[]
  }

  namespace FlowBtn {
    type Label = string
    type Style = Valid<Props<typeof Button>['buttonStyle']>
    type Icon = IconName

    type ActionKey = string
    type RequireNotes = boolean
    type Access = (user: User | null) => boolean

    type Admin = {
      actionKey?: ActionKey
      requireNotes?: RequireNotes
      access?: Access
    }

    type BtnProps = {
      btnStyle?: Style
      btnLabel: Label
      icon?: Icon
      admin?: Admin
    }

    type BaseBtnProps = BtnProps & { admin?: AdminBtnProps } & Omit<
        Props<typeof Button>,
        BtnOmitted
      >
    type AdminBtnProps = Partial<Admin>

    type CreateBtnPropsFn = (btnLabel: Label, options?: CreateBtnOptionProps) => BaseBtnProps

    type CreateBtnOptionProps = {
      admin: Pick<Admin, 'actionKey' | 'requireNotes'>
    }
  }
}
