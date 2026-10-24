import { Playfair_Display } from 'next/font/google'

export const playfair = Playfair_Display({
  display: 'swap',
  variable: '--font-playfair',
  subsets: ['latin'],
  preload: false,
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800', '900'],
})
