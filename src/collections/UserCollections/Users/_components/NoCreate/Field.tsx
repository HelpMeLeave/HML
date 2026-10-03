import { Button } from '@payloadcms/ui'
import { MailPlus } from 'lucide-react'
import type { UIFieldServerProps } from 'payload'
import { NoCreateCountdown } from './Field.client'

const NoCreate = ({ operation, req }: UIFieldServerProps) => {
  const url = '/admin/collections/user-invitations/create'
  if (operation == 'create' && !req.url?.includes('create-first'))
    return (
      <div className='create-user'>
        <div className='create-user-background' />
        <dialog
          className='alert'
          open>
          <h2 className='alert__header'>
            Will Redirect in <NoCreateCountdown url={url} />
          </h2>
          <p className='alert__content'>
            Please use the
            <Button
              margin={false}
              buttonStyle='none'
              className='emph'>
              <MailPlus /> Invite Users
            </Button>
            workflow to add new users
          </p>
        </dialog>
      </div>
    )
}

export default NoCreate
