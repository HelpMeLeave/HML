import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { CalloutActionBase } from '@/lexicals/Features/Callout/_actionToolbar'
import { ListTitleAction } from '@/lexicals/Features/ListTitleFeature/_actionToolbar'
import { RichListItemAction } from '@/lexicals/Features/RichListItem/_actionToolbar'
import { CoverGrp } from '@/lexicals/Features/SectionCover/_actionToolbar'
import { StructureGrp } from '@/lexicals/Features/Structure/_actionToolbar'

export const AllActions: ToolbarActionGroup[] = [
  StructureGrp,
  CoverGrp,
  ListTitleAction,
  RichListItemAction,
  CalloutActionBase,
]
