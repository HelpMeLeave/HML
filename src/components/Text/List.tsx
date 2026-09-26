import { cn } from '~/lib/cn'

const listClasses = cn(
	'leading-8 text-pretty',
	'my-6 ml-6 marker:font-bold has-[>li.task-list-item]:list-none *:[li]:pl-2 [li>ul,dd>dl,li>ol]:my-0 [&>li,&>dt]:mt-2',
	'list-label:list-none list-label:ml-0',
	'[:is(h1,h2,h3,h4,h5,h6)+*:is(ul,ol,dl)]:mt-0',
	'*:first:mt-0 in-[section]:my-0'
)

export const List = ({ type, ...props }: Props<'ul'> & { type?: 'numbered' | '' }) => {
	const El = type == 'numbered' ? 'ol' : 'ul'

	return (
		<El
			{...props}
			className={cn(
				type === 'numbered' ? 'list-decimal' : 'list-disc',
				listClasses,
				props.className
			)}
		/>
	)
}

const Li = ({ ...props }: Props<'li'>) => (
	<li
		{...props}
		className={cn(
			'list-label:first:font-semibold list-label:list-none list-label:ml-0 font-normal',
			props.className
		)}
	/>
)

const OL = ({ ...props }: Props<typeof List>) => (
	<List
		type='numbered'
		{...props}
	/>
)

const UL = ({ ...props }: Props<typeof List>) => <List {...props} />

export { Li, OL, UL }
