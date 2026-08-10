import { Icon } from '~/components/Icon'
import { cn } from '~/lib'

const ConnectingLine = ({ checked }: { checked: boolean }) => {
	return (
		<div
			aria-hidden='true'
			className='absolute inset-0 flex items-center'>
			<div
				className={cn(
					checked ? 'dark:bg-hml-yellow/25 bg-hml-red' : 'dark:bg-hml-yellow/15 bg-hml-red-700/50',
					'h-0.5 w-full'
				)}
			/>
		</div>
	)
}

const Circle = ({ name, className, children, onClick }: Props<'button'>) => (
	<button
		onClick={onClick}
		type='button'
		className={cn(
			'relative flex size-8 items-center justify-center rounded-full',
			'group border-2 transition-all',
			className
		)}>
		{children}
		<span className='sr-only'>{name}</span>
	</button>
)

const InnerCircle = ({ visited }: { visited: boolean }) => {
	return (
		<span
			aria-hidden='true'
			className={cn(
				'dark:bg-hml-yellow-500 bg-hml-red-700/50 size-2.5 rounded-full transition-colors',
				visited ? 'bg-hml-red' : (
					'dark:bg-hml-yellow/25 dark:group-hover:bg-hml-yellow/45 group-hover:bg-hml-red duration-300'
				)
			)}
		/>
	)
}

const Step = ({
	current,
	isLast,
	isCurrent,
	visited,
	name,
	onClick,
	stepIdx,
}: {
	stepIdx: number
	onClick: (id?: number) => void
	checked: boolean
	visited: boolean
	name: string
	isLast: boolean
	isCurrent: boolean
	current: number
}) => {
	const showCheck = [isLast && isCurrent, stepIdx < current].some(Boolean)

	return (
		<>
			<ConnectingLine checked={showCheck} />
			<Circle
				onClick={() => onClick && onClick(stepIdx)}
				name={name}
				className={cn(
					showCheck && !current && 'click',
					visited ? 'border-hml-red dark:border-hml-yellow-800' : 'border-transparent',
					showCheck ?
						'bg-hml-red dark:bg-hml-yellow-700 hover:bg-hml-red-400 hover:dark:bg-hml-yellow-800 hover:border-hml-red-500 hover:dark:border-hml-yellow-800'
					:	'bg-background'
				)}>
				{showCheck ?
					<Icon
						IconName='CheckIcon'
						aria-hidden='true'
						className='dark:text-hml-yellow-900 mt-0.5 size-6 stroke-[1.5px] text-white'
					/>
				:	<InnerCircle visited={visited} />}
			</Circle>
		</>
	)
}

export const Stepper = ({
	steps,
	current,
	onClick,
}: {
	current: number
	onClick: () => void
	steps: {
		name: string
		href: string
	}[]
}) => {
	return (
		<nav
			aria-label='Progress'
			className='w-full p-2 md:z-98'>
			<ol
				role='list'
				className='flex w-full items-center'>
				{steps.map((step, stepIdx) => (
					<li
						key={step.name}
						className={cn(stepIdx !== steps.length - 1 ? 'flex-1 pr-8 sm:pr-20' : '', 'relative')}>
						<Step
							current={current}
							isCurrent={stepIdx == current}
							isLast={stepIdx == steps.length - 1}
							stepIdx={stepIdx}
							onClick={onClick}
							name={step.name}
							checked={stepIdx < current}
							visited={stepIdx <= current}
						/>
					</li>
				))}
			</ol>
		</nav>
	)
}
