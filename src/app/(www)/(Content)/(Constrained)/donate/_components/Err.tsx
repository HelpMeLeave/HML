import { cn } from '~/lib'

export const Err = ({ err, message, ...props }: Props<'p'> & { err: boolean; message: string }) => {
	return (
		err && (
			<p
				{...props}
				className={cn('text-hml-red dark:text-hml-red-300 mt-2 text-sm', props.className)}>
				{message}
			</p>
		)
	)
}
