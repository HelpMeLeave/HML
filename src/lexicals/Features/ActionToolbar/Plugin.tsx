'use client'

import { ToolbarGroup } from '@/lexicals/Features/ActionToolbar/_components/ToolbarGroup'
import { GroupedActions } from '@/lexicals/Features/ActionToolbar/_lib/createGroupedActions'
import { initActionState } from '@/lexicals/Features/ActionToolbar/_lib/initActionState'
import type { ToolbarAction } from '@/lexicals/Features/ActionToolbar/_types'
import { cn } from '@/lib/cn'
import {
  setFloatingElemPosition,
  useEditorConfigContext,
} from '@payloadcms/richtext-lexical/client'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  mergeRegister,
  SELECTION_CHANGE_COMMAND,
  type LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** Floating toolbar shown above a Section/SubSection heading, or a line that can become the title of the list below it, while the caret is in it. */
const Toolbar = ({
  actions,
  ref,
  editor,
  toolbar,
}: {
  toolbar: Record<string, boolean>
  actions: Array<ToolbarAction>
  ref: RefObject<HTMLDivElement | null>
  editor: LexicalEditor
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        'action-toolbar group border-collapse rounded-sm border border-ui-200 bg-ui-0 toolbar hover:bg-ui-50',
        'action-display absolute top-0 left-0 z-10 opacity-0 transition-opacity duration-200 will-change-transform',
        '[&>.btn--withPopup]:m-0 [&>.btn--withPopup]:h-full [&>.btn--withPopup]:rounded-none [&>.btn--withPopup_.btn]:border-0',
        'h-6',
        'shadow-md',
        'empty:hidden'
      )}>
      {actions.map(({ slug, ...props }) => {
        if (toolbar[slug] == true) {
          return (
            <ToolbarGroup
              slug={slug}
              {...props}
              editor={editor}
              key={slug}
            />
          )
        }
      })}
    </div>
  )
}

export const ActionToolbarPlugin = ({ anchorElem }: { anchorElem: HTMLElement }) => {
  const [editor] = useLexicalComposerContext()
  const ref = useRef<HTMLDivElement>(null)
  const { editorConfig } = useEditorConfigContext()

  const {
    actions: ToolbarActions,
    $getVisibleToolbars,
    $getActualNode,
  } = useMemo(
    () => GroupedActions(editorConfig.resolvedFeatureMap),
    [editorConfig.resolvedFeatureMap]
  )

  const [toolbar, setToolbar] = useState<Record<string, boolean>>(initActionState(false))

  const $position = useEffectEvent(() => {
    if (!ref.current) return

    const check = $getVisibleToolbars()
    const el = $getSelection()

    const target =
      $isRangeSelection(el) ?
        editor.getElementByKey(el.anchor.getNode().getKey())
      : $getActualNode(check, editor)

    setToolbar(Object.fromEntries(check.map((c) => [c.slug, c.check])))
    setFloatingElemPosition({
      anchorElem,
      floatingElem: ref.current,
      targetRect: target instanceof HTMLElement ? target.getBoundingClientRect() : null,
      horizontalOffset: 0,
      verticalGap: 15,
    })
  })

  useEffect(() => {
    const position = () => editor.getEditorState().read($position)
    const scroller = anchorElem.parentElement

    window.addEventListener('resize', position)
    scroller?.addEventListener('scroll', position)

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => editorState.read($position)),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $position()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      () => {
        window.removeEventListener('resize', position)
        scroller?.removeEventListener('scroll', position)
      }
    )
  }, [anchorElem, editor])

  return createPortal(
    <Toolbar
      editor={editor}
      ref={ref}
      actions={ToolbarActions}
      toolbar={toolbar}
    />,
    anchorElem
  )
}
