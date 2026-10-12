import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { Button } from '@payloadcms/ui'
import { Fragment } from 'react/jsx-runtime'

export const ToolbarActionButtons = ({
  editor,
  entries,
}: ToolbarActionGroup & { editor: LexicalEditor }) => {
  return entries?.map(({ $isEnabled: isEnabled, slug, Icon: ItemIcon, onSelect, label }) => (
    <Fragment key={slug}>
      <Button
        className='h-5 border-0 first:rounded-l-[3px]! disabled:pointer-events-none disabled:opacity-50'
        round
        iconStyle='without-border'
        margin={false}
        size='small'
        buttonStyle='none'
        disabled={editor.getEditorState().read(() => !isEnabled(editor))}
        tooltip={label}
        aria-label={label}
        icon={ItemIcon && <ItemIcon />}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSelect(editor)}
      />
    </Fragment>
  ))
}
