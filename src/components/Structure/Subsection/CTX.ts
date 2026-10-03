import type { tSubSectionContext } from '@/components/Structure/_types'
import { createContext } from 'react'

export const SubSectionContext = createContext<tSubSectionContext>({
  open: false,
  handleToggle: () => {},
  type: 'default',
} as tSubSectionContext)
