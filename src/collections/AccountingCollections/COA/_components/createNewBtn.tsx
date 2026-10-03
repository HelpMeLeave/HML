'use client'

import { Button } from '@payloadcms/ui'
import { PlusCircle } from 'lucide-react'

export const CreateNewBtn = ({
  openDrawerAction,
  children,
}: {
  openDrawerAction: () => void
  children?: Props['children']
}) => {
  return (
    <>
      <Button
        margin={false}
        icon={<PlusCircle />}
        size='large'
        buttonStyle='none'

        tooltip='Create New Account'
        onClick={openDrawerAction}
      />
      {children}
    </>
  )
}
