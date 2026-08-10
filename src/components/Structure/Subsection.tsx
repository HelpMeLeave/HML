'use client'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

type tSubSectionContext = {
	open: boolean
	handleToggle: () => void
	type: 'default' | 'grey'
}

type tSubSectionProps = Omit<Props<'button'>, 'type' | 'title'> & {
	defaultOpen?: boolean
	type?: 'default' | 'grey'
	onOpen?: () => void
	onClose?: () => void
	onToggle?: (open: boolean) => void
}

const SubSectionContext = createContext<tSubSectionContext>(null!)

const Subsection = ({
	defaultOpen = true,
	type = 'default',
	role,
	'aria-label': ariaLabel,
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
			role={role}
			aria-label={ariaLabel}
			className={cn('flex flex-col', open && 'gap-y-2', props.className)}>
			<SubSectionContext.Provider value={contextValue}>{props.children}</SubSectionContext.Provider>
		</article>
	)
}

const Heading = ({ ...props }: Props<'button'>) => {
	const { type, open, handleToggle } = useContext(SubSectionContext)
	return (
		<button
			type='button'
			role='heading'
			{...props}
			className={cn(
				'click',
				'flex w-full items-baseline gap-4',
				'transition-all hover:opacity-75',
				type == 'default'
					&& 'text-hml-red dark:text-hml-grey text-2xl font-semibold tracking-tight text-pretty',
				type == 'grey'
					&& 'text-muted-foreground border-border/20 border-b font-sans text-xl font-bold tracking-tighter brightness-75 dark:text-white',
				props.className
			)}
			onClick={handleToggle}>
			<span className='relative top-1 block'>
				<Icon
					IconName='ChevronRightIcon'
					className={cn(open && 'rotate-90')}
				/>
			</span>
			{props.children}
		</button>
	)
}

const Content = ({
	as,
	...props
}: Props<'div'> & {
	as?: React.JSX.ElementType
}) => {
	const { open } = useContext(SubSectionContext)
	const Component = as ?? 'div'

	return (
		<Component
			{...props}
			className={cn('flex flex-col gap-y-4 pl-10 *:ml-0 *:first:mt-0', props.className)}>
			{open && props.children}
		</Component>
	)
}

const ContentList = ({
	as,
	...props
}: Props<'div'> & {
	as?: React.JSX.ElementType
}) => {
	const Kids = Array.isArray(props.children) ? props.children : [props.children]

	return (
		<Content
			as={as ?? 'ul'}
			{...props}
			style={{
				counterSet: 'item',
			}}
			className={cn(
				'*:marker:text-hml-mulberry dark:*:marker:text-hml-grey-400 list-decimal pl-10 *:list-outside *:marker:text-sm *:marker:font-semibold',
				props.className
			)}>
			{Kids.map((k, i) => {
				return (
					<li key={i}>
						<span className='block h-auto max-w-full pl-4 wrap-normal'>{k}</span>
					</li>
				)
			})}
		</Content>
	)
}

Subsection.Heading = Heading
Subsection.Content = Content
Subsection.List = ContentList

export {
	Subsection,
	Content as SubsectionContent,
	Heading as SubsectionHeading,
	ContentList as SubsectionList,
}
