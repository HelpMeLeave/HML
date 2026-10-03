'use client'

import { ButtonLink } from '@/components/Navigation/ButtonLink'
import { cn } from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

const link = cva(
  [
    'relative flex items-center gap-1.5 px-4 text-sm font-medium tracking-wider whitespace-nowrap',
    'text-soft transition-colors hocus:text-accent',
    'after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:bg-accent',
    'after:scale-x-0 after:transition-transform',
    'max-md:shrink-0 max-md:px-4 max-md:py-3.5 max-md:after:inset-x-4 max-md:after:bottom-0',
    'click outline-0 focus-visible:bg-accent-muted/20',
  ],
  {
    variants: {
      state: {
        default: '',
        current: 'text-accent after:scale-x-100',
        open: 'after:scale-x-100',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

export type SectionHeaderProps = {
  href?: string
  state?: 'default' | 'current' | 'open'
  hasChildren?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const Chevron = ({ state }: { state: SectionHeaderProps['state'] }) => (
  <ChevronDown
    aria-hidden
    className={cn('size-3.5 transition-transform max-md:hidden', state == 'open' && 'rotate-180')}
  />
)

export const SectionHeader = ({
  href,
  children,
  state = 'default',
  hasChildren = false,
  onOpen,
  onClose,
}: Props & SectionHeaderProps) => {
  return (
    <ButtonLink
      href={href}
      aria-expanded={hasChildren ? state == 'open' : undefined}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      className={cn(link({ state }))}>
      {children}
      {hasChildren && <Chevron state={state} />}
    </ButtonLink>
  )
}
