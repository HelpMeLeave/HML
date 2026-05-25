'use client'

import { useState } from 'react'
import { Icon } from '~/components/Icon'
import { InlineLink } from '~/components/Text/Link'
import { topBarAnnouncement } from '~/data/announcement'
import { toTitleCase } from '~/lib/text'

export const AnnouncementBanner = () => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		isVisible && (
			<div
				id='urgentBanner'
				className='bg-hml-red sticky bottom-0 grid w-full grid-cols-[1fr_auto] items-center gap-6 px-6 py-3.5 sm:px-6.5'>
				<InlineLink
					className='dark:decoration-hml-mulberry-100 flex w-full max-w-full items-center justify-start gap-x-3 overflow-hidden md:justify-center'
					href={`/${topBarAnnouncement.link.folder}/${topBarAnnouncement.link.fileName}.${topBarAnnouncement.link.ext}`}
					target={topBarAnnouncement.link.target}
					rel='noopener noreferrer'>
					<Icon
						IconName={topBarAnnouncement.type.icon}
						className='text-hml-mulberry-50'
					/>
					<span className='text-hml-grey block w-fit truncate text-sm font-semibold italic md:text-lg/5 lg:text-2xl'>
						{toTitleCase(topBarAnnouncement.message)}
					</span>
				</InlineLink>
				<div className='flex justify-end'>
					<button
						title='Dismiss'
						type='button'
						onClick={() => setIsVisible(false)}
						className='click bg-hml-red active:shadow-hml-mulberry hover:text-hml-purple-700 -m-3 rounded-xl p-3 text-white transition focus-visible:-outline-offset-4 active:shadow-inner'>
						<span className='sr-only'>Dismiss</span>
						<Icon
							IconName='XIcon'
							aria-hidden='true'
							className='size-4'
						/>
					</button>
				</div>
			</div>
		)
	)
}
