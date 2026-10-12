import { $isStructureContainer, $isStructureHeading } from '@/lexicals/Features/Structure/nodes'
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical'
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils'

/** The Section/SubSection whose heading holds the caret. */
export const $getHeadingAtCaret = () => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return null

  const heading = $findMatchingParent(selection.anchor.getNode(), $isStructureHeading)
  return heading && $findMatchingParent(heading, $isStructureContainer)
}
