import { createAction } from '@/lexicals/Features/ActionToolbar/_lib/createAction'
import { createButtonGroup } from '@/lexicals/Features/ActionToolbar/_lib/createButtonGroup'
import { $getHeadingAtCaret } from '@/lexicals/Features/Structure/_lib'
import { ArrowDown, ArrowUp, Trash } from 'lucide-react'

export const StructureGrp = createButtonGroup('headings', {
  feature: 'structure',
  $getKey: () => $getHeadingAtCaret()?.getKey(),
  entries: [
    createAction('headingStyleUp', {
      label: 'Increase Level',
      Icon: ArrowUp,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('up')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('up')),
      hideIfDisabled: true,
    }),
    createAction('headingStyleDown', {
      label: 'Decrease Level',
      Icon: ArrowDown,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.nextHeadingStyle('down')),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.stepHeadingStyle('down')),
      hideIfDisabled: true,
    }),
    createAction('removeHeading', {
      Icon: Trash,
      $isEnabled: () => Boolean($getHeadingAtCaret()?.getKey()),
      onSelect: (editor) => editor?.update(() => $getHeadingAtCaret()?.dissolve(true)),
    }),
  ],
})
