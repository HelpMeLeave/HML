import { cn } from '~/lib/cn'

export const Label = ({ text, ...props }: Props<'label'> & { text?: string }) => {
	return (
		<label
			{...props}
			className={cn(
				'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				'*:disabled:opacity-70 has-disabled:cursor-not-allowed',
				'*:[button]:click flex items-center gap-2 has-[input[type="checkbox"]]:items-stretch',
				props.className
			)}>
			{text && (
				<span>
					{text} {props['aria-required'] && <span className='align-middle text-red-500'>*</span>}
				</span>
			)}
			{props.children}
		</label>
	)
}
