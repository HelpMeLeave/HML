import { $getListItemAtCaret } from '@/lexicals/Features/_lists/getListItemAtCaret'
import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { $addDetails } from '@/lexicals/Features/RichListItem/_lib/addDetails'
import { $isRichListItem, $removeDetails } from '@/lexicals/Features/RichListItem/nodes'
import { ListMinus, Paragraph } from '@boxicons-pro/react'
import { $isListItemNode } from '@payloadcms/richtext-lexical/lexical/list'

export const RichListItemAction: ToolbarActionGroup = {
  toolbar: 'lists',
  slug: 'richListItem',
  features: ['rich-list-item'],
  $include: () => Boolean($getListItemAtCaret()),
  $getKey: () => {
    return $getListItemAtCaret()?.getKey()
  },
  type: 'buttons',
  entries: [
    {
      slug: 'addDetails',
      label: 'Create Rich List',
      Icon: Paragraph,
      $isActive: () => false,
      $isEnabled: () => !$isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if (item && !$isRichListItem(item) && $isListItemNode(item)) $addDetails(item)
        }),
      hideIfDisabled: true,
    },
    {
      slug: 'removeDetails',
      label: 'Dissolve Rich List',
      Icon: ListMinus,
      $isActive: () => false,
      $isEnabled: () => $isRichListItem($getListItemAtCaret()),
      onSelect: (editor) =>
        editor?.update(() => {
          const item = $getListItemAtCaret()
          if ($isRichListItem(item)) $removeDetails(item)
        }),
      hideIfDisabled: true,
    },
  ],
}
