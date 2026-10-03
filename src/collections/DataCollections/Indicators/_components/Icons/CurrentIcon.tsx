'use client'
import { Button } from '@payloadcms/ui'
import { MousePointerClick, Trash } from 'lucide-react'
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
        icon={<MousePointerClick />}
        onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Pick Icon'}
      </Button>
      {value && (
        <Button
          margin={false}
          type='button'
          buttonStyle='error'
          size='xsmall'
          round={false}
          icon={<Trash />}
          onClick={() => setValue('')}>
          Clear
        </Button>
      )}
    </>
  )
}
