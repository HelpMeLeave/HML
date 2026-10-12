import { $toggleTitled, TitledListNode } from '@/lexicals/Features/ListTitleFeature'
import { $getEditor, $getNodeByKey } from '@payloadcms/richtext-lexical/lexical'

/** The title is the list's first item; once that item leaves the list, the list goes back to untitled. Runs as a transform, so the last committed state still holds the old first child. */
export const $untitleOnTitleRemoval = (list: TitledListNode) => {
  const prev = $getEditor().getEditorState()._nodeMap.get(list.getKey())
  const prevTitleKey = prev instanceof TitledListNode ? prev.__first : null
  if (!prevTitleKey) return

  const title = $getNodeByKey(prevTitleKey)
  if (title && list.is(title.getParent())) return

  $toggleTitled(list)
}
