'use client'

import { redirect, RedirectType } from 'next/navigation'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'

import { cn } from '~/lib/cn'

export const NowBtn = ({
	...props
}: Props<'button'> & {
	mainTxt?: string
	subTxt?: string
}) => {
	return (
		<Button
			variant={'default'}
			href='/leave-now'
			{...props}
			className={cn(
				// 'dark:bg-hml-red dark:text-hml-grey',
				'click z-10 mb-4 grid w-full grid-cols-2 items-center justify-center lg:grid-cols-[max-content_auto]',
				props.className || ''
			)}>
			<span className='mr-4 text-end text-xl font-black uppercase sm:text-5xl lg:text-end'>
				<span className='sm:hidden'>Help Me Leave </span>NOW
			</span>
			<span className='inline-flex w-auto text-start text-sm font-bold text-balance uppercase md:text-base/4'>
				I Desperately Need to Seek Safety
			</span>
		</Button>
	)
}

export const SmallBtns = () => {
	const btns = [
		{
			main: 'SOON',
			sub: 'I Need to Leave in 2-6 Months',
			onClick: '/leave-now/start',
		},
		{
			main: 'EXPLORE',
			sub: "I'm Curious About My Options",
			onClick: '/explorer',
		},
	]

	return (
		<span className='z-10 grid w-full grid-cols-1 gap-4'>
			{btns.map((btn, i) => {
				return (
					<Button
						variant='muted'
						key={i}
						href={btn.onClick}
						className='hover:text-background hover:bg-hml-mulberry dark:bg-hml-mulberry-700 dark:hover:bg-hml-mulberry-700/50 flex w-full grow flex-col items-center justify-center gap-0 px-4 py-2 tracking-tighter dark:outline-2'>
						<span className='text-lg sm:text-xl'>
							Help Me {btn.main == 'SOON' && 'LEAVE '}
							<b className='font-extrabold'>{btn.main}</b>
						</span>
						<span className='text-xs tracking-tight text-balance whitespace-normal uppercase sm:text-sm'>
							{btn.sub}
						</span>
					</Button>
				)
			})}
		</span>
	)
}

export const MapBtn = () => {
	const handleClick = () => {
		redirect('/map', 'push' as RedirectType)
	}
	return (
		<>
			<Button
				onClick={handleClick}
				variant={'ghost'}
				className='text-foreground fixed right-10 hidden items-center rounded-lg text-2xl font-extrabold min-[1200px]:flex'>
				Explore the Map{' '}
				<Icon
					IconName='ChevronRightIcon'
					className='size-18 animate-pulse'
				/>
			</Button>
			<span className='w-full p-6 pr-0 text-end transition-all min-[1200px]:hidden'>
				<Button
					onClick={handleClick}
					variant={'ghost'}
					className='bg-ring/20 hover:bg-ring/30 inline-flex w-auto min-w-max items-center justify-evenly gap-2 rounded-r-none py-0 pr-2 text-base font-bold tracking-wide italic shadow-sm'>
					<Icon
						IconName='GlobeIcon'
						className={cn('mr-auto size-4 in-[button:hover]:animate-spin')}
					/>
					resource map
				</Button>
			</span>
		</>
	)
}
