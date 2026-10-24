'use client'

import { pillColors } from '@/_config/plugins/Plugin-Workflow/_components/Pill/pillColors'
import { getClientSideAdminURL } from '@/app/(www)/_lib/getURL'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import type { Content, User, WorkflowFlowStatus } from '@/payload-types'
import { ArrowOutRightSquareHalf, Edit, UserCircle, type BoxIcon } from '@boxicons-pro/react'
import type { Dispatch, SetStateAction } from 'react'

const Btn = ({
  href,
  Icon,
  label,
}: {
  href: string
  Icon: BoxIcon
  label?: string
  showLabel?: boolean
}) => {
  return (
    <Button
      as='link'
      href={href}
      variant='primary'
      rounded
      size='small'
      iconAttributes={{
        pack: 'filled',
        iconPosition: 'right',
      }}
      Icon={Icon}>
      <span>{label}</span>
    </Button>
  )
}

const FlowPill = ({ status }: { status: WorkflowFlowStatus }) => {
  return (
    <Badge
      color={pillColors[status]}
      className='mx-2 basis-auto uppercase'>
      {status}
    </Badge>
  )
}

export const AdminBar = ({
  user,
  id,
  flow,
}: {
  user?: Nullish<Partial<User>>
  id?: string | number
  flow?: Content['flow']
  setUser?: Dispatch<SetStateAction<Nullish<Partial<User>>>>
}) => {
  return (
    user && (
      <div
        data-slot='admin-bar'
        className='sticky top-0 z-50 flex w-svw items-center justify-end bg-background/2 px-6 py-1 text-background backdrop-blur-xl has-[+#homePage]:hidden [&+*:not(#homePage)]:top-7.5 md:[&~main]:mt-16'>
        <FlowPill status={flow!} />
        <span className='mx-4 block h-4 min-h-full w-px bg-muted/20' />

        <span className='flex items-baseline justify-end gap-2'>
          <Btn
            href={getClientSideAdminURL(`collections/content/${id}`)}
            Icon={Edit}
            label='Edit'
          />
          <span className='mx-4 block h-4 min-h-full w-px bg-muted/20' />
          <Btn
            href={getClientSideAdminURL('account')}
            Icon={UserCircle}
            label='Account'
          />
          <Btn
            href={getClientSideAdminURL('logout')}
            Icon={ArrowOutRightSquareHalf}
            label='Logout'
          />
        </span>
      </div>
    )
  )
}
