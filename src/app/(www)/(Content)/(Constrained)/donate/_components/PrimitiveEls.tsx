import { cn } from '~/lib'

export const LgLabel = ({ children }: Props) => (
	<span className='text-hml-red-700 dark:text-hml-yellow-300 my-2 text-xl font-semibold'>
		{children}
	</span>
)

export const CheckoutSection = ({ ...props }: Props<'section'>) => (
	<section
		className={cn('mx-6 flex flex-col gap-y-0', props.className)}
		{...props}
	/>
)
