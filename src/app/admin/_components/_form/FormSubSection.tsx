import { cn } from '~/lib/cn'

export const SubSectionFieldset = ({ ...props }: Props<'fieldset'>) => {
	return (
		<fieldset
			{...props}
			className={cn('mx-auto w-full max-w-2xl not-first:mt-4 not-last:mb-2', props.className)}>
			{props.children}
		</fieldset>
	)
}

const Divider = ({ side }: { side?: 'left' | 'right' }) => (
	<span
		className={cn(
			side == 'left' && 'bg-linear-to-r',
			side == 'right' && 'bg-linear-to-l',
			'to-interactive/25 h-px w-full from-transparent'
		)}
	/>
)

export const SubSectionFieldsetLegend = ({
	description,
	...props
}: Props<'legend'> & {
	description?: ReactNode
}) => {
	return (
		<legend
			{...props}
			className={cn(
				'relative mb-4 grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-x-2 text-lg whitespace-nowrap',
				props.className
			)}>
			<Divider side='left' />
			{props.children}
			<Divider side='right' />
			{description && (
				<p
					data-slot='description'
					className='subtitle col-span-full row-start-2 text-sm font-light text-wrap italic'>
					{description}
				</p>
			)}
		</legend>
	)
}

export const SubSectionFieldsetDetails = ({ ...props }: Props) => {
	return (
		<div
			{...props}
			className={cn('mx-auto grid w-full gap-y-8', props.className)}
		/>
	)
}

export const Subsection = ({ ...props }: Props<'div'>) => {
	return (
		<div
			{...props}
			className='mx-auto w-full max-w-2xl space-y-4 not-first:mt-4 *:not-first:px-6 not-last:mb-2'>
			{props.children}
		</div>
	)
}
export const SubsectionHeading = ({
	description,
	...props
}: Props<'h3'> & {
	description?: ReactNode
}) => {
	return (
		<div
			role='heading'
			{...props}
			className={cn(
				'relative mb-4 grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-x-2 text-lg whitespace-nowrap',
				props.className
			)}>
			<Divider side='left' />
			{props.children}
			<Divider side='right' />
			{description && (
				<p
					data-slot='description'
					className='subtitle col-span-full row-start-2 text-sm font-light text-wrap italic'>
					{description}
				</p>
			)}
		</div>
	)
}
