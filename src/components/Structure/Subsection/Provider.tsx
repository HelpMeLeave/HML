import { useCallback, useMemo, useState } from 'react'
import { cn } from '~/lib'
import type { tSubSectionProps } from '../Subsection'
import { SubSectionContext } from './CTX'

export const SubsectionProvider = ({
	defaultOpen = true,
	type = 'default',
	onOpen,
	onClose,
	onToggle,
	...props
}: tSubSectionProps) => {
	const [open, setOpen] = useState(defaultOpen)

	const handleToggle = useCallback(() => {
		if (onOpen && !open) {
			onOpen()
			setOpen(true)
			return
		} else if (onClose && open) {
			onClose()
			setOpen(false)
			return
		} else if (onToggle) {
			onToggle(!open)
			setOpen(prev => !prev)
		} else {
			setOpen(prev => !prev)
		}
	}, [onOpen, onClose, onToggle, open])

	const contextValue = useMemo(
		() => ({
			open,
			handleToggle,
			type,
		}),
		[open, handleToggle, type]
	)

	return (
		<article
			{...props}
			data-open={open}
			className={cn('flex flex-col', open && 'gap-y-2', props.className)}>
			<SubSectionContext.Provider value={contextValue}>{props.children}</SubSectionContext.Provider>
		</article>
	)
}
