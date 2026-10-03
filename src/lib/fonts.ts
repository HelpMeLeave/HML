import {
  Atkinson_Hyperlegible_Mono,
  Atkinson_Hyperlegible_Next,
  Bebas_Neue,
} from 'next/font/google'

export const atkinsonFont = Atkinson_Hyperlegible_Next({
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-hyper',
  display: 'swap',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: false,
})
export const atkinsonMonoFont = Atkinson_Hyperlegible_Mono({
  weight: 'variable',
  style: ['normal'],
  variable: '--font-hyper-mono',
  display: 'swap',
  fallback: ['monospaced'],
  subsets: ['latin'],
  preload: false,
})

export const bebasNeue = Bebas_Neue({
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-bebas',
  subsets: ['latin'],
  preload: false,
})

import localFont from 'next/font/local'

export const interstateFont = localFont({
  src: '../../public/interstate-bold.woff',
  variable: '--font-interstate',
})
