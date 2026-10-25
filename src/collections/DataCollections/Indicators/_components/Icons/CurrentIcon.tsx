'use client'
import { CursorClick, Trash } from '@boxicons-pro/react'
import { Button } from '@payloadcms/ui'
import type { Dispatch, SetStateAction } from 'react'

export const CurrentIcon = ({
  value,
  open,
  setOpenAction: setOpen,
  setValueAction: setValue,
}: {
  value: string
  setValueAction: Dispatch<SetStateAction<string>>
  open: boolean
  setOpenAction: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <>
      <Button
        margin={false}
        type='button'
        buttonStyle='primary'
        size='xsmall'
        icon={<CursorClick pack='filled' />}
        onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Pick Icon'}
      </Button>
      {value && (
        <Button
          className='ml-2 btn--error'
          margin={false}
          type='button'
          buttonStyle='error'
          size='xsmall'
          round={false}
          icon={<Trash pack='filled' />}
          onClick={() => setValue('')}>
          Clear
        </Button>
      )}
    </>
  )
}
