import Link from 'next/link'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export const Button = ({
	variant = 'default',
	preIcon,
	...props
}: tBtnProps<'link' | 'button'> & {
	preIcon?: Props.Icon['IconName']
}) => {
	const classes = cn(
		'click relative rounded-md px-3.5 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-0 has-[svg]:py-2 dark:tracking-normal',
		(variant == 'default' || variant == 'bright')
			&& 'dark:bg-hml-mulberry dark:hover:bg-hml-mulberry-700 bg-hml-red hover:bg-hml-mulberry text-white',
		variant == 'muted'
			&& 'text-hml-red hover:bg-muted outline-hml-red dark:text-hml-grey dark:bg-hml-mulberry-100/10 ring-zinc-600 outline-1 hover:outline-current/10 dark:outline-transparent',
		variant == 'ghost' && 'border-0 bg-transparent text-current',
		props.className
	)

	if ('href' in props) {
		const linkProps = props as Props.Link
		return (
			<Link
				prefetch={false}
				{...linkProps}
				href={linkProps.href}
				className={classes}>
				<Inner
					children={props.children}
					preIcon={preIcon}
				/>
			</Link>
		)
	}
	const buttonProps = props as Props<'button'>

	return (
		<button
			{...buttonProps}
			className={classes}>
			<TouchTarget>
				<Inner
					children={props.children}
					preIcon={preIcon}
				/>
			</TouchTarget>
		</button>
	)
}

export const CloseButton = ({
	variant = 'default',
	...props
}: tBtnProps<'link' | 'button'>) => {
	const classes = cn(
		'click relative px-3.5 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap uppercase transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-0 has-[svg]:py-2 dark:tracking-normal m-0 size-9 flex justify-center items-center rounded-full',
		(variant == 'default' || variant == 'bright')
			&& 'dark:bg-hml-mulberry dark:hover:bg-hml-mulberry-700 bg-hml-red hover:bg-hml-mulberry text-white',
		variant == 'muted'
			&& 'text-hml-red hover:bg-muted outline-hml-red dark:text-hml-grey dark:bg-hml-mulberry-100/10 ring-zinc-600 outline-1 hover:outline-current/10 dark:outline-transparent',
		variant == 'ghost' && 'border-0 bg-transparent text-current',
		props.className
	)

	const buttonProps = props as Props<'button'>

	return (
		<button
			{...buttonProps}
			className={classes}>
			<TouchTarget>
				<Icon IconName={'XIcon'} className="m-0 flex-shrink-0" />
			</TouchTarget>
		</button>
	)
}

export function TouchTarget({
	children,
	...props
}: {
	children: ReactNode
} & Props) {
	return (
		<>
			<span
				className={cn(
					'absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden',
					props.className
				)}
				aria-hidden='true'
			/>
			{children}
		</>
	)
}

type tBtnProps<T extends 'button' | 'link'> = {
	variant?: 'default' | 'muted' | 'ghost' | 'bright'
} & (T extends 'link' ? Omit<Props.Link, 'as'> & { as: 'link'; href: string }
: T extends 'button' ? Props<'button'>
: never)

const Inner = ({
	preIcon,
	...props
}: {
	preIcon?: Props.Icon['IconName']
	children: ReactNode
}) => {
	return (
		<>
			{preIcon && (
				<Icon
					IconName={preIcon}
					className='mr-4 -ml-1 inline h-4 w-4'
				/>
			)}
			{props.children}
		</>
	)
}
