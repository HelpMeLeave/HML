import {
  type BaseSelection,
  type ElementNode,
  type Klass,
  $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $getNearestNodeOfType } from '@payloadcms/richtext-lexical/lexical/utils'

export const isActive =
  <T extends ElementNode>(nodeType: Klass<T>) =>
  ({ selection }: { selection: BaseSelection }) =>
    Boolean(
      $isRangeSelection(selection)
      && Boolean($getNearestNodeOfType(selection.anchor.getNode(), nodeType))
    )
