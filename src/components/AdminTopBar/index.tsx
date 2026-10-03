'use client'

import { pillColors } from '@/_config/plugins/Plugin-Workflow/_components/Pill/pillColors'
import { getClientSideAdminURL } from '@/app/(www)/_lib/getURL'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { useMe } from '@/hooks/useMe'
import type { Content, User, WorkflowFlowStatus } from '@/payload-types'
import { type LucideIcon, Edit, LogOut, User2 } from 'lucide-react'

const Btn = ({
  href,
  Icon,
  label,
  showLabel,
}: {
  href: string
  Icon: LucideIcon
  label?: string
  showLabel?: boolean
}) => {
  return (
    <Button
      as='link'
      href={href}
      variant='ghost'
      className='flex flex-col items-center gap-0.5 rounded-lg p-2 text-xs hover:bg-black/4 hover:text-body dark:hover:bg-white/5'>
      <Icon size={showLabel ? 10 : 16} />
      {showLabel && <span>{label}</span>}
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
  slug,
  user: _user,
  id,
  flow,
}: {
  slug: string
  user: User | false
  id?: string | number
  flow?: Content['flow']
}) => {
  return <></>
  const { user: me } = useMe()
  return (
    me && (
      <div
        data-slot='admin-bar'
        className='sticky top-0 z-50 flex w-svw items-center justify-end bg-body/2 px-6 py-1 text-body backdrop-blur-xl [&+*]:top-10 md:[&~main]:mt-16'>
        <FlowPill status={flow!} />
        <span className='mx-4 block h-4 min-h-full w-px bg-muted/20' />

        <span className='flex items-baseline justify-end gap-2'>
          <Btn
            href={getClientSideAdminURL(`collections/${slug}/${id}`)}
            Icon={Edit}
            label='Edit'
          />
          <Btn
            href={getClientSideAdminURL('admin', 'logout')}
            Icon={LogOut}
            label='Logout'
          />
          <span className='mx-4 block h-4 min-h-full w-px bg-muted/20' />
          <Btn
            href={getClientSideAdminURL('account')}
            Icon={User2}
            label='Account'
          />
          <Btn
            href={getClientSideAdminURL('admin', 'logout')}
            Icon={LogOut}
            label='Logout'
          />
        </span>
      </div>
    )
  )
}
