import type { User } from '@/payload-types'
import type { LucideIcon } from 'lucide-react'

export type ViewBtnType = 'collection' | 'link' | 'external' | 'none'

export type UserWithPillars = User & { pillars: string[]; teams: string[] }

export type Item = {
  type: ViewBtnType
  to: string
  Icon?: LucideIcon
  children?: ReactNode
  label?: string | false
  className?: Props['className']
  check?: (user: UserWithPillars) => boolean
}
export type ItemGroup = Item[]

export type ItemGrp = {
  slug: string
  check: Item['check']
  items: Item[]
}
