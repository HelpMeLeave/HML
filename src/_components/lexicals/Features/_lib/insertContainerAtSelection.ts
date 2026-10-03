import {
  $getSelection,
  $isRangeSelection,
  type ElementNode,
  type LexicalEditor,
  type LexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

/** Insert a fresh container at the cursor and put the caret in its heading. Shared by the SubSection and Toggling SubSection menu items. */
export const insertContainerAtSelection = (
  editor: LexicalEditor,
  build: (headingChildren: LexicalNode[]) => { container: ElementNode; heading: ElementNode }
) =>
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    const { container, heading } = build([])
    selection.insertNodes([container])
    heading.selectStart()
  })
