import { createAction } from '@/lexicals/Features/ActionToolbar/_lib/createAction'
import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import {
  $getCover,
  $hgroupAtCaret,
  icons,
  OPEN_COVER_DRAWER_COMMAND,
} from '@/lexicals/Features/SectionCover/_lib'

export const CoverGrp: ToolbarActionGroup = {
  toolbar: 'headings',
  features: ['section-cover'],
  slug: 'section-cover',
  type: 'buttons',
  $include: () => Boolean($hgroupAtCaret()),
  $getKey: () => $getCover($hgroupAtCaret())?.getKey() ?? null,
  entries: [
    createAction('addCoverImg', {
      label: 'Add Cover Image',
      Icon: icons.add,
      $isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())) == false,
      onSelect: function (editor) {
        const key = editor?.getEditorState().read(() => $hgroupAtCaret()?.getKey())
        if (key) editor?.dispatchCommand(OPEN_COVER_DRAWER_COMMAND, key)
      },
      hideIfDisabled: true,
    }),
    createAction('swapCoverImg', {
      label: 'Swap Cover Image',
      Icon: icons.swap,
      $isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())),
      onSelect: function (editor) {
        const key = editor?.getEditorState().read(() => $hgroupAtCaret()?.getKey())
        if (key) editor?.dispatchCommand(OPEN_COVER_DRAWER_COMMAND, key)
      },
      hideIfDisabled: true,
    }),
    createAction('editCoverImg', {
      label: 'Edit Cover Image',
      Icon: icons.edit,
      $isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())),
      onSelect: function (editor) {
        const key = editor?.getEditorState().read(() => $getCover($hgroupAtCaret())?.getKey())
        const el = key ? editor?.getElementByKey(key) : null
        el?.querySelector<HTMLButtonElement>('[class*="__upload-drawer-toggler"]')?.click()
      },
      hideIfDisabled: true,
    }),
    createAction('removeCoverImg', {
      label: 'Remove Cover Image',
      Icon: icons.remove,
      $isActive: () => false,
      $isEnabled: () => Boolean($getCover($hgroupAtCaret())),
      onSelect: (editor) => editor?.update(() => $getCover($hgroupAtCaret())?.remove()),
      hideIfDisabled: true,
    }),
  ],
}
