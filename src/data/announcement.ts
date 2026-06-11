type Announcement = {
	message: string
	type: {
		full: string
		abbreviated: string
		icon: IconKey
	}
	link: {
		folder: string
		fileName: string
		ext: string
		target: '_blank' | '_self'
	}
	isActive: boolean
}

export const topBarAnnouncement: Announcement = {
	message: 'Have Canadian ancestors? Learn how to claim citizenship by descent under Bill C-3',
	type: {
		full: 'Report Released',
		abbreviated: 'Report',
		icon: 'GlobeIcon',
	},
	link: {
		folder: 'pdf',
		fileName: 'how-to-apply-for-canadian-citizenship-by-descent',
		ext: 'pdf',
		target: '_blank',
	},
	isActive: true,
}
