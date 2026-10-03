import { LinkSection } from '@/_components/views/Base/LinkSection'
import type { User } from '@/payload-types'
import { Activity, CalendarSearch, ChartLine, UserPlus2, UserRoundSearch } from 'lucide-react'

const items = [
  {
    name: 'Invite New User',
    Icon: UserPlus2,
    href: '/admin/collections/user-invitations/create',
    description: '',
    status: true,
  },
  {
    name: 'View Users',
    Icon: UserRoundSearch,
    href: 'admin/collections/users',
    description: '',
    status: true,
  },
  {
    name: 'View Releases',
    Icon: CalendarSearch,
    href: 'admin/collections/releases',
    description: '',
    status: true,
  },
  // TODO: SET THIS VIEW UP
  {
    name: 'Recent Activity',
    Icon: Activity,
    href: '',
    description: '',
    status: false,
  },
  {
    name: 'Analytics',
    Icon: ChartLine,
    href: '',
    description: '',
    status: false,
  },
]

export const AdminSection = ({ isDirector }: Pick<User, 'isDirector'>) => {
  return (
    isDirector && (
      <LinkSection
        items={items}
        title={'Admin'}
      />
    )
  )
}
