import { Atkinson_Hyperlegible_Next } from 'next/font/google'

export const atkinsonFont = Atkinson_Hyperlegible_Next({
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-hyper',
  display: 'swap',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: false,
})
