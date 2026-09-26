'use client'
import { useContext } from 'react'
import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'
import { SubSectionContext } from './Subsection/CTX'
import { SubsectionProvider } from './Subsection/Provider'

export type tSubSectionContext = {
	open: boolean
	handleToggle: () => void
	type: 'default' | 'grey'
}

export type tSubSectionProps = Omit<Props<'button'>, 'type' | 'title'> & {
	defaultOpen?: boolean
	type?: 'default' | 'grey'
	onOpen?: () => void
	onClose?: () => void
	onToggle?: (open: boolean) => void
}

export const Subsection = ({
	defaultOpen = true,
	type = 'default',
	role,
	'aria-label': ariaLabel,
	...props
}: tSubSectionProps) => {
	return (
		<SubsectionProvider
			aria-label={ariaLabel}
			defaultOpen={defaultOpen}
			type={type}
			role={role}
			{...props}
		/>
	)
}

export const SubsectionHeading = ({ ...props }: Props<'button'>) => {
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

export const SubsectionContent = ({
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

export const SubsectionList = ({
	as,
	...props
}: Props<'div'> & {
	as?: React.JSX.ElementType
}) => {
	const Kids = Array.isArray(props.children) ? props.children : [props.children]

	return (
		<SubsectionContent
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
		</SubsectionContent>
	)
}
