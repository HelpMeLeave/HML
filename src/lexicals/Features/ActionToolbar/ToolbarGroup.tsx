import type {
  ToolbarAction,
  ToolbarActionDropdownGroup,
  ToolbarActionGroup,
} from '@/lexicals/Features/ActionToolbar/_types'
import { ToolbarActionButtons } from '@/lexicals/Features/ActionToolbar/ToolbarActionButtons'
import { ToolbarActionDivider } from '@/lexicals/Features/ActionToolbar/ToolbarActionDivider'
import { ToolbarActionDropdown } from '@/lexicals/Features/ActionToolbar/ToolbarActionDropdown'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { Fragment } from 'react/jsx-runtime'

export const ToolbarGroup = ({
  editor,
  groups,
}: ToolbarAction & {
  editor: LexicalEditor
}) => {
  return groups.map(({ slug, type, entries, ...entry }, i) => {
    const showDivider = i != groups.length - 1
    const shouldInclude = editor.getEditorState().read(() => entry.$include())

    return (
      shouldInclude && (
        <Fragment key={slug}>
          {type == 'buttons' ?
            <ToolbarActionButtons
              {...entry}
              type={'buttons'}
              slug={slug}
              entries={entries}
              editor={editor}
            />
          : <ToolbarActionDropdown
              {...entry}
              Icon={(entry as ToolbarActionDropdownGroup & ToolbarActionGroup).Icon}
              label={(entry as ToolbarActionDropdownGroup & ToolbarActionGroup).label}
              type={'dropdown'}
              slug={slug}
              entries={entries}
              editor={editor}
            />
          }
          <ToolbarActionDivider showDivider={showDivider} />
        </Fragment>
      )
    )
  })
}
