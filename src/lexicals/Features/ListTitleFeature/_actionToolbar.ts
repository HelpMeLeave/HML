import { $getFirstItemInCurrentList } from '@/lexicals/Features/_lists/getFirstItemInCurrentList'
import { $getListAtCaret } from '@/lexicals/Features/_lists/getListAtCaret'
import { createButtonGroup } from '@/lexicals/Features/ActionToolbar/_lib/createButtonGroup'
import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { $toggleTitled } from '@/lexicals/Features/ListTitleFeature'
import { $getPotentialListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/getPotentialListTitle'
import { $getTitledListAtCaret } from '@/lexicals/Features/ListTitleFeature/_lib/getTitledListAtCaret'
import { $makeListTitle } from '@/lexicals/Features/ListTitleFeature/_lib/makeListTitle'
import { $isParagraphNode } from '@payloadcms/richtext-lexical/lexical'
import { List, ListStart } from 'lucide-react'

export const ListTitleAction: ToolbarActionGroup = createButtonGroup('lists', {
  feature: 'list-title',
  $getKey: () => $getFirstItemInCurrentList($getListAtCaret())?.getKey(),
  entries: [
    {
      slug: 'makeListTitle',
      label: 'Make List Title',
      Icon: ListStart,
      $isActive: () => false,
      $isEnabled: () => {
        const list = $getListAtCaret()
        return (
          Boolean(list)
          && Boolean($getTitledListAtCaret()) == false
          && $isParagraphNode(list?.getPreviousSibling())
        )
      },
      onSelect: (editor) =>
        editor?.update(() => {
          const lead = $getPotentialListTitle()
          if (lead) $makeListTitle(lead)
        }),
      hideIfDisabled: true,
    },
    {
      slug: 'dissolveListTitle',
      label: 'Dissolve List Title',
      Icon: List,
      $isActive: () => false,
      $isEnabled: () => Boolean($getTitledListAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const list = $getTitledListAtCaret()
          if (list) $toggleTitled(list)
        }),
      hideIfDisabled: true,
    },
  ],
})
