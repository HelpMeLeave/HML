import { Button } from '~/components/Button'
import { cn } from '~/lib/cn'
import type { Modal } from './Structure/Modal'
import { Section, SectionHeading } from './Structure/Section'

type ActionLinkBase = {
	href: string
	label: string
}

type ActionLink<WithTarget extends boolean = false> =
	WithTarget extends true ? ActionLinkBase & { target?: string }
	: WithTarget extends false ? ActionLinkBase
	: never

type CTAPrimaryAction = ActionLink<true> | ReturnType<typeof Button> | ReturnType<typeof Modal>

type CTAProps = Props<'div'> & {
	secondaryAction?: ActionLink
	subtitle?: ReactNode
	primaryAction: CTAPrimaryAction
}

export const CTA = ({ secondaryAction, subtitle, ...props }: CTAProps) => {
	const action = props.primaryAction
	return (
		<Section
			className={cn(
				'grid gap-y-2 md:grid-cols-[auto_minmax(0px,150px)]',
				!secondaryAction && 'grid-cols-[auto_minmax(0px,150px)]',
				props.className
			)}>
			<SectionHeading className='text-hml-red dark:text-hml-yellow col-start-1'>
				{props.children}
			</SectionHeading>
			<span
				className={cn(
					'text-muted-foreground col-start-1 flex w-full flex-col gap-y-2 text-base text-[.95rem] leading-[1.85] md:gap-y-6 md:pr-4 md:pl-2',
					!action && !secondaryAction && 'max-w-[calc(100%-150px)]'
				)}>
				{subtitle}
			</span>
			{(action || secondaryAction) && (
				<Actions
					primaryAction={action}
					secondaryAction={secondaryAction}
				/>
			)}
		</Section>
	)
}

const PrimaryAction = ({ primaryAction }: { primaryAction: CTAProps['primaryAction'] }) => {
	if ('href' in primaryAction) {
		const { label, ...actions } = primaryAction
		return (
			<Button
				{...actions}
				className='max-h-min'
				href={actions?.href || '#'}
				target={actions?.target || '_self'}
				variant='default'>
				{label}
			</Button>
		)
	}

	return primaryAction
}

const SecondaryAction = ({ secondaryAction }: { secondaryAction: CTAProps['secondaryAction'] }) => (
	<a
		href={secondaryAction?.href}
		className='max-h-min text-xs/6 font-semibold whitespace-nowrap text-zinc-900 hover:opacity-80 dark:text-zinc-100'>
		{secondaryAction?.label}
		<span aria-hidden='true'>→</span>
	</a>
)

const Actions = ({ primaryAction, secondaryAction, className }: CTAProps) => {
	return (
		<div
			className={cn(
				'relative top-2 row-start-auto h-full content-start gap-y-6 self-center md:col-start-2 md:row-span-2 md:row-start-1',
				'flex w-full flex-wrap justify-around',
				className
			)}>
			{primaryAction && <PrimaryAction primaryAction={primaryAction} />}
			{secondaryAction && <SecondaryAction secondaryAction={secondaryAction} />}
		</div>
	)
}
