'use client'
import { cn } from '~/lib/cn'

export const Input = ({
	className,
	type,
	...props
}: (Props.WithRef<'input'> | Props<'input'>) & {
	type?: Props<'input'>['type']
}) => {
	return (
		<input
			{...props}
			type={type}
			data-slot='input'
			className={cn(
				'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-muted/25 hover:border-muted/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none',
				'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-muted/50 focus-visible:ring-ring/50 focus-visible:ring-2',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
		/>
	)
}
