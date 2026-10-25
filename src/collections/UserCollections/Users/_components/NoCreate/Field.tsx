import { PaperPlane } from '@boxicons-pro/react'
import { Button } from '@payloadcms/ui'
import type { UIFieldServerProps } from 'payload'
import { NoCreateCountdown } from './Field.client'

const NoCreate = ({ operation, req }: UIFieldServerProps) => {
  const url = '/admin/collections/user-invitations/create'
  if (operation == 'create' && !req.url?.includes('create-first'))
    return (
      <div className='create-user hidden has-[.countdown]:fixed has-[.countdown]:inset-0 has-[.countdown]:flex has-[.countdown]:items-center'>
        <div className='create-user-background fixed inset-0 bg-(--theme-overlay) transition-all duration-200 ease-linear after:absolute after:inset-0 after:backdrop-blur-[2px] after:[content:""]' />
        <dialog
          className='alert mx-auto w-min max-w-[75vw] rounded-(--style-radius-l) px-12 py-8 shadow-[0_2px_2px_-1px_rgba(0,0,0,0.1)]'
          open>
          <h2 className='alert__header mb-2 font-header text-[2rem] font-normal text-nowrap'>
            Will Redirect in <NoCreateCountdown url={url} />
          </h2>
          <p className='alert__content block w-full font-mono text-[0.85rem] leading-normal text-nowrap uppercase'>
            Please use the
            <Button
              margin={false}
              buttonStyle='none'
              icon={<PaperPlane size='sm' />}
              iconPosition='left'
              className='emph relative bottom-px inline-flex items-center py-[0.15rem] pr-2 pl-1.5 align-middle font-semibold text-accent hover:text-body'>
              Invite Users
            </Button>
            workflow to add new users
          </p>
        </dialog>
      </div>
    )
}

export default NoCreate
