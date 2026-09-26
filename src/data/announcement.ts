type Announcement = {
	message: string
	type: {
		full: string
		abbreviated: string
		icon: IconKey
	}
	isActive: boolean
} & (
	| {
			linkType: 'link'
			link: {
				src: string
				target: '_blank' | '_self'
			}
	  }
	| {
			linkType: 'document'
			link: {
				folder: string
				fileName: string
				ext: string
				target: '_blank' | '_self'
			}
	  }
)

export const topBarAnnouncement: Announcement = {
	message: 'Help Me Vote 2026!',
	type: {
		full: 'Resource',
		abbreviated: 'Resc.',
		icon: 'Medal',
	},
	link: {
		src: 'help-me-vote-2026',
		target: '_self',
	},
	linkType: 'link',
	isActive: true,
}
