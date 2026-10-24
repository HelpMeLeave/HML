'use client'

import { PlusCircle } from '@boxicons-pro/react'
import { Button } from '@payloadcms/ui'

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
