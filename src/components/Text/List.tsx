import { cn } from '~/lib/cn'
import { InlineLink } from './Link'

const listClasses = cn(
	'leading-8 text-pretty',
	'my-6 ml-6 marker:font-bold has-[>li.task-list-item]:list-none *:[li]:pl-2 [li>ul,dd>dl,li>ol]:my-0 [&>li,&>dt]:mt-2',
	'list-label:list-none list-label:ml-0',
	'[:is(h1,h2,h3,h4,h5,h6)+*:is(ul,ol,dl)]:mt-0'
)

export const List = ({ type, ...props }: Props<'ul'> & { type?: 'numbered' | '' }) => {
	const className = cn(
		type === 'numbered' ? 'list-decimal' : 'list-disc',
		listClasses,
		props.className
	)

	if (type === 'numbered') {
		return (
			<OL
				{...props}
				className={className}
			/>
		)
	}
	return (
		<ul
			{...props}
			className={cn(listClasses, props.className)}
		/>
	)
}

const Li = ({ ...props }: Props<'li'>) => (
	<li
		{...props}
		className={cn('list-label:list-none list-label:ml-0', props.className)}
	/>
)

const OL = ({ ...props }: Props<typeof List>) => (
	<List
		type='numbered'
		{...props}
	/>
)

const UL = ({ ...props }: Props<typeof List>) => <List {...props} />

const DL = ({ ...props }: Props<'dl'>) => {
	return (
		<dl
			{...props}
			className={cn(listClasses, 'ml-0', props.className)}
		/>
	)
}

const DT = ({ href, ...props }: Props<'dt'> & { href?: string }) => {
	return (
		<dt
			{...props}
			className={cn('pl-2 text-lg leading-0.5', !href && 'font-semibold', props.className)}>
			{href ?
				<InlineLink
					href={href}
					target={href.endsWith('pdf') || href.startsWith('http') ? '_blank' : '_self'}>
					{props.children}
				</InlineLink>
			:	props.children}
		</dt>
	)
}

const DD = (props: Props<'dd'>) => (
	<dd
		{...props}
		className={cn('mb-4 pl-8', props.className)}
	/>
)
DL.Item = DD
DL.Title = DT

export { DL, Li, OL, UL }
