'use client'

import { redirect, RedirectType } from 'next/navigation'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { Button } from '~/components/Button'
import { Modal } from '~/components/Structure/Modal'
import { triagePages } from '../_lib/Triage'
import './TriageModal.css'
import { Link } from '~/components/Text'

export function TriageModal() {
	type BranchKey = keyof typeof triagePages
	type Choice = {
		text: string
		next: BranchKey
	}

	const [branch, setBranch] = useState<BranchKey>('intro')

	const branchContent = triagePages[branch]

	if ('redirect' in branchContent) {
		redirect(branchContent.redirect, 'push' as RedirectType)
	}

	return (
		<Modal
			id='onsite-triage'
			btnText='Reach Out'
			heading='Is HML right for you?'>
			{branchContent.body && (
				<Markdown components={{
					a({children}) {
						return (<a className="text-base cursor-pointer hover:decoration-current decoration-hml-mulberry/50 dark:decoration-hml-yellow-700 hover:text-hml-mulberry dark:hover:text-hml-yellow text-foreground dark:text-hml-grey-100 font-semibold underline decoration-2 underline-offset-2 transition-all dark:font-medium">{children}</a>)
					},
					h3({children}) {
						return (<h3 className="text-base font-semibold italic text-[1.2rem] mb-3">{children}</h3>)
					}
				}}>{branchContent.body}</Markdown>
			)}
			{'choices' in branchContent && (
				<div className='flex gap-3'>
					{(branchContent.choices as Choice[]).map(choice => (
						<Button
							key={`triage-option-${choice.text}`}
							onClick={() => setBranch(choice.next)}>
							{choice.text}
						</Button>
					))}
				</div>
			)}
			{'cta' in branchContent && (
				<Link
					className="font-bold"
					size="lg"
					href={branchContent.cta.href}
				>
					{branchContent.cta.text}
				</Link>
			)}
		</Modal>
	)
}
