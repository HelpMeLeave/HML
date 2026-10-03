import { Discord } from '@/components/Icon/Discord'
import type Link from 'next/link'

export type Social = {
  name: string
  type: typeof Discord
  href: typeof Link.prototype.href
  color: string
}

export const socials: Social[] = [
  {
    name: 'Discord',
    type: Discord,
    href: 'https://discord.gg/TcHKRgED6y',
    color: '#7289da',
  },
]
