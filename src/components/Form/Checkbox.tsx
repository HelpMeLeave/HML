'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { Icon } from '~/components/Icon'
import { cn } from '~/lib/cn'

function Checkbox({ className, ...props }: Props<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot='checkbox'
			className={cn(
				'peer border-muted/25 hover:border-muted/50 dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-border/3 active:shadow-border/10 size-4 shrink-0 rounded-lg border shadow-[inset_1px_2px_1px_0] transition-shadow outline-none *:cursor-pointer! focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:bg-hml-red data-[state=checked]:text-foreground',
				'data-[state=checked]:border-hml-red-600 dark:data-[state=checked]:border-hml-yellow-500',
				'dark:data-[state=checked]:bg-hml-yellow-600',
				className
			)}
			{...props}>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='click flex items-center justify-center text-white transition-none'>
				<Icon
					IconName='CheckIcon'
					className='size-4 stroke-1'
				/>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
