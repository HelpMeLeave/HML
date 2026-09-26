import { createContext } from 'react'
import type { tSubSectionContext } from '../Subsection'

export const SubSectionContext = createContext<tSubSectionContext>({
	open: false,
	handleToggle: () => {},
	type: 'default',
})
