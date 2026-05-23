'use client'

import { useState } from 'react';
import Markdown from 'react-markdown'
import { redirect, RedirectType } from 'next/navigation'

import { Modal } from "~/components/Structure/Modal";
import { Button } from '~/components/Button';
import { triagePages } from '../_lib/Triage';
import './TriageModal.css'

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
			btnText='triage'
			heading='Is HML right for you?'>
			{branchContent.body && <Markdown>{branchContent.body}</Markdown>}
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
		</Modal>
	)
}