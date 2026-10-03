import type { UserWithPillars } from '@/_components/AdminLayout/Sidebar/_types'
import type { PILLARS } from '@/lib/constants/PILLARS'

export const checkPillar = (user: UserWithPillars, key: (typeof PILLARS)[number]['value']) =>
  user.isManagement ? true : (
    user.pillars.filter((p) => p.toLowerCase() == key.toLowerCase()).length > 0
  )

export const checkTeam = (user: UserWithPillars, key: string) =>
  user.isManagement ? true : (
    user.teams.filter((p) => p.toLowerCase() == key.toLowerCase()).length > 0
  )
