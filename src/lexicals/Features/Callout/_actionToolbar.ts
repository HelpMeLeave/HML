import { calloutType } from '@/lexicals/Features/_lib/nodeStates'
import { createAction } from '@/lexicals/Features/ActionToolbar/_lib/createAction'
import { createButtonGroup } from '@/lexicals/Features/ActionToolbar/_lib/createButtonGroup'
import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { $getCalloutAtCaret } from '@/lexicals/Features/Callout/_lib'
import type { BoxIcon } from '@boxicons-pro/react'
import { BookOpen, LightBulb, Note, Siren } from '@boxicons-pro/react'
import { $getState, $setState } from '@payloadcms/richtext-lexical/lexical'

const calloutItem = ({ key, label, Icon }: { key: string; label: string; Icon: BoxIcon }) =>
  createAction(key, {
    $isActive: function () {
      const callout = $getCalloutAtCaret()
      if (!callout) return false
      return $getState(callout, calloutType) == key
    },
    $isEnabled: function () {
      const callout = $getCalloutAtCaret()
      if (!callout) return false
      return $getState(callout, calloutType) != key
    },
    Icon,
    label,
    onSelect: function (editor) {
      return editor?.update(() => {
        const callout = $getCalloutAtCaret()
        if (!callout) return
        $setState(callout, calloutType, key)
      })
    },
  })

export const CalloutActionBase: ToolbarActionGroup = createButtonGroup('callout', {
  feature: 'callout',
  $getKey: () => $getCalloutAtCaret()?.getKey(),
  entries: [
    { key: 'note', label: 'Note', Icon: Note },
    { key: 'tip', label: 'Good to know', Icon: LightBulb },
    { key: 'urgent', label: 'Urgent', Icon: Siren },
    { key: 'case-study', label: 'Case study', Icon: BookOpen },
  ].map(calloutItem),
})
