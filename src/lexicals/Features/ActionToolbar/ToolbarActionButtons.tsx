import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import { cn } from '@/lib/cn'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { Button } from '@payloadcms/ui'
import { Fragment } from 'react/jsx-runtime'

export const ToolbarActionButtons = ({
  editor,
  entries,
}: ToolbarActionGroup & { editor: LexicalEditor }) => {
  return entries?.map(
    ({
      $isEnabled: isEnabled,
      slug,
      Icon: ItemIcon,
      onSelect,
      label,
      isActive: isActive,
      hideIfDisabled,
    }) => {
      const { enabled, active } = editor
        .getEditorState()
        .read(() => ({ enabled: isEnabled(editor), active: isActive() }))

      const shouldHide = typeof hideIfDisabled == 'boolean' && hideIfDisabled == true && !enabled

      return (
        !shouldHide && (
          <Fragment key={slug}>
            <Button
              className={cn(
                'h-5 border-0 first:rounded-l-[3px]! disabled:pointer-events-none disabled:opacity-50',
                active && 'opacity-100! [--color:var(--theme-secondary)]'
              )}
              round
              iconPosition='left'
              iconStyle='without-border'
              margin={false}
              size='small'
              buttonStyle='none'
              disabled={!enabled}
              tooltip={label}
              aria-label={label}
              icon={ItemIcon && <ItemIcon />}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(editor)}>
              {label}
            </Button>
          </Fragment>
        )
      )
    }
  )
}
