'use client'

import MuiModal from '@mui/material/Modal'
import { useState } from 'react'

import { Heading } from '~/components/Text/Heading'
import { cn } from '~/lib/cn'
import { Button, CloseButton } from '../Button'

//TODO: Get reduced motion detection working
// const isReduced: boolean = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
// const modalTiming: number = isReduced ? 0 : 400;
const modalTiming: number = 400
export const Modal = ({
	id,
	btnText = 'Open Modal',
	heading = 'Heading',
	children,
}: {
	id: string
	btnText?: string
	heading?: string
	children: ReactNode
}) => {
	const [open, setOpen] = useState(false)
	const [willClose, setWillClose] = useState(false)

	function handleClose() {
		setWillClose(true)

		setTimeout(() => {
			setWillClose(false)
			setOpen(false)
		}, modalTiming)
		setTimeout(() => {
			// TODO: Use a ref to target this element
			document.getElementById(`modal-${id}__open-btn`)?.focus()
		}, modalTiming + 100)
	}

	return (
		<>
			<Button
				id={`modal-${id}__open-btn`}
				onClick={() => setOpen(true)}>
				{btnText}
			</Button>
			<MuiModal
				open={open}
				onClose={handleClose}
				className='bg-background/50 m-0 flex h-full w-full items-center justify-center p-0'
				id={`modal-${id}`}>
				<div
					className={cn(
						'modal__body bg-background flex size-9/10 shrink-0 flex-col gap-6 rounded-xl px-6 pt-0 pb-10',
						'duration-400 motion-reduce:duration-0',
						willClose ? 'animate-modal-vanish' : 'animate-modal-appear',
						willClose && 'modal__body--will-close'
					)}
					style={{
						animation: `${willClose ? 'modalVanish' : 'modalAppear'} ${modalTiming}ms var(--anim-ease) both`,
					}}
					id={`modal-${id}__body`}>
					<div className='modal__header my-2 flex w-full items-center justify-between'>
						<Heading className='text-hml-slate dark:text-hml-grey text-[2rem] font-semibold tracking-tight text-pretty'>
							{heading}
						</Heading>
						<CloseButton
							variant='muted'
							onClick={handleClose}
						/>
					</div>
					<div className='modal__content overflow-y-auto'>{children}</div>
				</div>
			</MuiModal>
		</>
	)
}
