'use client'

import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { Button, Popup, PopupList } from '@payloadcms/ui'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const ToolbarActionDropdown = ({
  editor,
  entries,
  label,
  Icon,
}: Extract<ToolbarActionGroup, { type: 'dropdown' }> & { editor: LexicalEditor }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Popup
      className='group h-[calc(100%-2px)]'
      initActive
      buttonType='custom'
      forceOpen={open}
      button={
        <Button
          className='px-1! in-last:rounded-r-[3px]!'
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          tooltip={label}
          iconPosition='left'
          size='small'
          icon={Icon && <Icon />}
          buttonStyle='none'
          margin={false}>
          <ChevronDown className='icon ml-2 size-3' />
        </Button>
      }
      size='small'>
      <PopupList.ButtonGroup
        buttonSize='small'
        className='action-toolbar__popup *:gap-2'
        textAlign='right'>
        {entries.map((item) => (
          <PopupList.Button
            key={item.slug}
            className='flex-row! items-center *:[svg]:size-3.5'
            disabled={editor.getEditorState().read(() => !item.$isEnabled())}
            onClick={() => item.onSelect(editor)}>
            {item.Icon && <item.Icon />}
            <span className='mt-0.5 block leading-[0.95]'>{item.label}</span>
          </PopupList.Button>
        ))}
      </PopupList.ButtonGroup>
    </Popup>
  )
}
