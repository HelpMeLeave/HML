import { Eyebrow } from '~/components/Text/Eyebrow'
import { Subtitle } from '~/components/Text/Subtitle'
import { cn } from '~/lib/cn'

const Section = ({
	as,
	...props
}: Props<'section'> & {
	as?: React.JSX.ElementType
}) => {
	const Component = as || 'section'

	return (
		<Component
			data-section
			{...props}
			className={cn('flex flex-col gap-y-8', props.className)}>
			{props.children}
		</Component>
	)
}

const SectionHGroup = ({ ...props }: Props<'hgroup'>) => {
	return (
		<hgroup
			className={cn('mb-0', props.className)}
			{...props}
		/>
	)
}
const SectionHeading = ({ ...props }: Props<'h2'>) => (
	<h2
		{...props}
		className={cn(
			'text-hml-slate dark:text-hml-grey text-[2rem] font-semibold tracking-tight text-pretty',
			props.className
		)}>
		{props.children}
	</h2>
)
const SectionEyebrow = ({ children, ...props }: Props<'p'>) => {
	return (
		<Eyebrow
			{...props}
			className={cn('text-sm/8', props.className)}>
			{children}
		</Eyebrow>
	)
}
const SectionSubtitle = ({ ...props }: Props<'p'>) => (
	<Subtitle
		{...props}
		className={cn('pl-2 text-[1.05rem]/loose text-balance', props.className)}>
		{props.children}
	</Subtitle>
)

export { Section, SectionEyebrow, SectionHeading, SectionHGroup, SectionSubtitle }
