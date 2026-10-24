import { Atkinson_Hyperlegible_Mono } from 'next/font/google'

export const atkinsonMonoFont = Atkinson_Hyperlegible_Mono({
  weight: 'variable',
  style: ['normal'],
  variable: '--font-hyper-mono',
  display: 'swap',
  fallback: ['monospaced'],
  subsets: ['latin'],
  preload: false,
})
