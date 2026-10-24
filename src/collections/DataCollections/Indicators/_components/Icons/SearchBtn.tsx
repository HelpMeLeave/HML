'use client'

import { Button } from '@payloadcms/ui'
import type { Dispatch, SetStateAction } from 'react'

export const SearchBtn = ({
  custom,
  selectAction,
  setCustomAction,
}: {
  custom: string
  setCustomAction: Dispatch<SetStateAction<string>>
  selectAction: (id: string) => void
}) => (
  <Button
    margin={false}
    type='button'
    className='btn btn--style-secondary btn--size-small'
    disabled={!custom.trim()}
    onClick={() => {
      selectAction(custom.trim())
      setCustomAction('')
    }}>
    Use
  </Button>
)
