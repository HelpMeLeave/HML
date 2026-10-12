import {
  $findMatchingParent,
  $getSelection,
  $isRangeSelection,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

export const $getAtCaret = <T extends LexicalNode>(check: (node: LexicalNode) => boolean) => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return null
  return $findMatchingParent(selection.anchor.getNode(), check) as T
}
