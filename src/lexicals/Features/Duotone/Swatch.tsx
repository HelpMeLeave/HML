'use client'

import { COLORS } from '@/lexicals/Features/Duotone/_lib/COLORS'
import type { DuotoneKey } from '@/lexicals/Features/Duotone/_types'
import { cn } from '@/lib/cn'
import { Button, type Theme } from '@payloadcms/ui'

type SwatchProps = {
  title: DuotoneKey
  active?: DuotoneKey
  theme: Theme
  setColor: () => void
}

export const Swatch = ({ title, active, theme, setColor }: SwatchProps) => {
  return (
    <Button
      data-variant={COLORS[title][theme]}
      type='button'
      tooltip={title}
      extraButtonProps={{
        'data-state': title == active ? 'active' : undefined,
        style: {
          background: COLORS[title][theme],
        },
      }}
      className={cn(
        'ring-1 ring-background/30',
        'grid size-5 cursor-pointer place-items-center bg-transparent p-0! transition-all *:size-[0.8rem]',
        'disabled:cursor-default disabled:opacity-35',
        'data-[state="active"]:ring-1'
      )}
      onClick={() => setColor()}
    />
  )
}
