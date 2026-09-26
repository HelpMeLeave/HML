import { cn } from '~/lib/cn'

export const Large = ({ ...props }: Props<'span'>) => {
	return (
		<span
			{...props}
			className={cn(
				'mx-auto block max-w-lg py-2 text-center text-lg',
				'has-[a:first-child,a:last-child]:py-0',
				'has-[a:first-child,a:last-child]:text-start',
				'has-[a:first-child,a:last-child]:mx-0',
				'has-[a:first-child,a:last-child]:*:[a]:text-xl',
				'has-[a:first-child,a:last-child]:*:[a]:font-bold',
				props.className
			)}
		/>
	)
}
