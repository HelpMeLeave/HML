import type { Appearance } from '@stripe/stripe-js'

export const appearance = (dark: boolean): Appearance => ({
	theme: 'stripe',
	variables: {
		colorPrimary: dark ? '#7a2235' : '#ac162b',
		colorBackground: dark ? '#17191c' : '#fafafa',
		colorText: dark ? '#f4f4f5' : '#27272a',
		colorDanger: '#cb374c',
		borderRadius: '8px',
		fontFamily: 'inherit',
		labelFontSize: '0.875rem',
		labelFontWeight: '600',
		labelColorText: dark ? 'oklch(96.7% 0.001 286.375)' : 'oklch(27.4% 0.006 286.033)',
	},
	rules: {
		'.Input': {
			borderColor: `color-mix(in hsl, ${dark ? '#d4dadc' : '#5e646e'} 25%, transparent)`,
			padding: '0.5rem',
			backgroundColor: `color-mix(in oklab, ${dark ? '#2a2e34' : 'white'} 30%, transparent)`,
		},
		'.Input:hover': {
			borderColor: `color-mix(in hsl,${dark ? '#d4dadc' : '#5e646e'} 50%, transparent)`,
			// boxShadow: '0 0 0 1px #ffcc01, 0 1px 1px 0 rgba(0, 0, 0, 0.07)',
		},
		'.Block': {
			borderColor: 'transparent',
			boxShadow: 'none',
		},
	},
})
