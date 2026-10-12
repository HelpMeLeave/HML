import { $isCallout } from '@/lexicals/Features/Callout/CalloutNode'
import {
  $findMatchingParent,
  $getSelection,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'

/** Callout at the caret position */
export const $getCalloutAtCaret = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return null

  return $findMatchingParent(selection.anchor.getNode(), $isCallout)
}
