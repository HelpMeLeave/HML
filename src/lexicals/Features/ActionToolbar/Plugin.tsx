'use client'

import type { ToolbarAction } from '@/lexicals/Features/ActionToolbar/_types'
import { AllActions, GroupedActions } from '@/lexicals/Features/ActionToolbar/Actions'
import { ToolbarGroup } from '@/lexicals/Features/ActionToolbar/ToolbarGroup'
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
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Fragment } from 'react/jsx-runtime'

type ActionStateInitFn = <T>(startingVal: T, actionKey?: keyof ToolbarAction) => Record<string, T>
const ActionInitState: ActionStateInitFn = (startingVal) =>
  Object.fromEntries(Object.keys(AllActions).map((ea) => [ea, startingVal]))

/** Floating toolbar shown above a Section/SubSection heading, or a line that can become the title of the list below it, while the caret is in it. */
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

  const [toolbar, setToolbar] = useState<Record<string, boolean>>(ActionInitState(false))

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
      targetRect: target instanceof HTMLElement ? target?.getBoundingClientRect() : null,
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
    <div
      style={{
        // @ts-expect-error custom var
        '--color': 'var(--color-muted)',
        '--stroke-color': 'var(--theme-secondary)',
        '--bg': 'var(--theme-elevation-0)',
        '--hover-bg': 'var(--theme-elevation-50)',
      }}
      ref={ref}
      className={cn('action-toolbar group toolbar', 'h-6', 'shadow-md', 'empty:hidden!')}>
      {ToolbarActions.map(({ slug, ...props }) => {
        if (toolbar[slug] == true) {
          return (
            <Fragment key={slug}>
              <ToolbarGroup
                slug={slug}
                {...props}
                editor={editor}
                key={slug}
              />
            </Fragment>
          )
        }
      })}
    </div>,
    anchorElem
  )
}
