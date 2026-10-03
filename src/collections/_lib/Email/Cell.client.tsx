'use client'

import { Button, Drawer, useModal } from '@payloadcms/ui'
import { Mail } from 'lucide-react'

// TODO: EMAIL RICH TEXT DRAWER
export const MailToDrawer = ({ id, children }: { children?: ReactNode; id: string }) => {
  const modal = useModal()

  const props: Omit<Parameters<typeof Drawer>[0], 'children'> = {
    slug: `mailTo-${id}`,
    title: 'Send E-Mail',
    gutter: true,
    className: 'classNameTest',
  }

  return (
    <>
      <Button
        className='btn-icon'
        type='button'
        margin={false}
        buttonStyle='dashed'
        iconStyle='without-border'
        size='xsmall'
        iconPosition='left'
        icon={<Mail />}
        onClick={() => modal.openModal(`mailTo-${id}`)}>
        {children}
      </Button>
      <Drawer {...props}>Sup</Drawer>
    </>
  )
}
