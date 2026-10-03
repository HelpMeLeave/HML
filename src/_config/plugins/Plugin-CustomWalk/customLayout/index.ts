import type { FieldWalkConfig } from '@/_config/plugins/Plugin-CustomWalk/_types'
import { forCustom } from '@/_config/plugins/Plugin-CustomWalk/customLayout/_fieldCustom'
import { forGroup, NammedUnammed } from '@/_config/plugins/Plugin-CustomWalk/customLayout/_forGroup'
import { minWidth } from '@/_config/plugins/Plugin-CustomWalk/customLayout/_minWidth'

export const customLayout: FieldWalkConfig = {
  all: [forCustom, minWidth],
  group: [forGroup, NammedUnammed],
}
