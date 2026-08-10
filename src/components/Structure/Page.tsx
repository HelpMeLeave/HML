import { Main } from '~/components/Main'
import { Eyebrow } from '~/components/Text/Eyebrow'
import { Subtitle } from '~/components/Text/Subtitle'
import { cn } from '~/lib/cn'
import { PageBreadcrumb } from './PageBreadcrumb'

export const Page = ({ ...props }: Props) => {
	return (
		<Main>
			<section
				{...props}
				data-layout='page'
				className={cn(
					'mx-auto flex w-full max-w-2xl flex-col gap-y-6 px-6 lg:max-w-7xl lg:px-8',
					'*:data-section:not-[hgroup+section]:mt-8',
					'*:data-section:[hgroup+section]:mt-4',
					props.className
				)}>
				{props.children}
			</section>
		</Main>
	)
}

export const PageHGroup = ({ ...props }: Props<'hgroup'>) => {
	return (
		<hgroup
			data-slot='page-hgroup'
			className={cn(
				'max-w-4xl',
				'grid grid-cols-1 grid-rows-[auto_auto_1fr]',
				'*:data-[slot=page-eyebrow]:row-start-1',
				'*:data-[slot=page-heading]:row-start-2',
				'*:data-[slot=page-subtitle]:row-start-3',
				'gap-y-2',
				props.className
			)}
			{...props}
		/>
	)
}

export const PageHeading = ({
	eyebrow,
	subtitle,
	...props
}: Props<'h1'> & { eyebrow?: ReactNode; subtitle?: ReactNode }) => (
	<>
		{eyebrow && <PageEyebrow>{eyebrow}</PageEyebrow>}
		<h1
			data-slot='page-heading'
			className={cn(
				'text-4xl font-semibold tracking-tight text-pretty text-gray-900 capitalize sm:text-5xl dark:text-white',
				props.className
			)}>
			{props.children}
		</h1>
		{subtitle && <PageSubtitle>{eyebrow}</PageSubtitle>}
	</>
)

export const PageSubtitle = ({ ...props }: Props) => {
	return (
		<Subtitle
			data-slot='page-subtitle'
			{...props}
			className={cn('text-xl leading-loose', props.className)}
		/>
	)
}

export const PageEyebrow = ({ ...props }) => {
	if (props.children) {
		return (
			<Eyebrow
				data-slot='page-eyebrow'
				{...props}
			/>
		)
	}
	return <PageBreadcrumb data-slot='page-eyebrow' />
}
