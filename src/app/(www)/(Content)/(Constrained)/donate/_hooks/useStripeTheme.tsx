import type { Appearance } from '@stripe/stripe-js'
import { useTheme } from 'next-themes'

export const useStripeTheme = (): Appearance => {
	const { resolvedTheme } = useTheme()
	const theme = (typeof resolvedTheme == 'string' ? resolvedTheme : 'light') as 'dark' | 'light'

	const alpha = (color: string, amount: number) =>
		`color-mix(in hsl,${color} ${amount < 1 ? amount * 100 : amount}%, transparent)`

	const colors = {
		dark: {
			variables: {
				colorPrimary: '#3f4300',
				colorBackground: '#17191c',
				colorText: '#f4f4f5',
				labelColorText: 'oklch(96.7% 0.001 286.375)',
			},
			inputBorder: '#d4dadc',
			inputBg: '#2a2e34',
			bright: '#dae638',
		},
		light: {
			variables: {
				colorPrimary: '#ac162b',
				colorBackground: '#fafafa',
				colorText: '#27272a',
				labelColorText: 'oklch(27.4% 0.006 286.033)',
			},
			bright: '#ac162b',
			inputBorder: '#5e646e',
			inputBg: 'white',
		},
	}[theme]

	return {
		theme: 'stripe',
		variables: {
			fontSizeBase: '1rem',
			colorDanger: '#cb374c',
			borderRadius: '8px',
			fontFamily: 'inherit',
			labelFontSize: '0.875rem',
			labelFontWeight: '600',
			...colors.variables,
		},
		rules: {
			'.Input': {
				borderColor: alpha(colors.inputBorder, 0.25),
				padding: '0.5rem',
				backgroundColor: alpha(colors.inputBg, 30),
				boxShadow: 'unset',
			},
			'.Input:hover:focus': {
				borderColor: colors.variables.colorPrimary,
			},
			'.Input:hover': {
				borderColor: alpha(colors.inputBorder, 0.5),
			},
			'.TabIcon--selected': {
				fill: colors.bright,
			},
		},
	}
}
