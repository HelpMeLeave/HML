import { cn } from '~/lib/cn'

/**
 *
 * @param props - General props for the heading element.
 * @param level - The heading level (1-6) to render. Defaults to 2.
 * @param size - The size of the heading, which affects the font size.
 *               Options are 'xs', 'sm', 'md', 'lg', and 'title'.
 *               Defaults to 'md'.
 *
 * @returns A heading element (`h1` to `h6`) with the specified level and size.
 *
 * @category Components - Text
 */

export const Heading = ({ level = 2, size = 'md', ...props }: Props.Heading) => {
	const className = cn(
		`text-foreground mt-6 mb-2 font-sans font-bold tracking-tighter dark:text-white`,
		size == 'title' && 'text-4xl font-black',
		size == '2xl' && 'text-5xl',
		size == 'xl' && 'text-3xl',
		size == 'lg' && 'text-muted-foreground text-xl brightness-75',
		props.className
	)

	if (level == 1) {
		return (
			<h1
				{...props}
				className={className}
			/>
		)
	}
	if (level == 2) {
		return (
			<h2
				{...props}
				className={className}
			/>
		)
	}
	if (level == 3) {
		return (
			<h3
				{...props}
				className={className}
			/>
		)
	}
	if (level == 4) {
		return (
			<h4
				{...props}
				className={className}
			/>
		)
	}
	if (level == 5) {
		return (
			<h5
				{...props}
				className={className}
			/>
		)
	}
	return (
		<h6
			{...props}
			className={className}
		/>
	)
}
