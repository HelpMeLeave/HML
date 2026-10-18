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
      buttonStyle='none'
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
        'outline-secondary text-text border-elevation-500 dark:border-elevation-0 grid size-5 cursor-pointer place-items-center border-[0.5px] bg-background p-0! outline-0 outline-offset-1 transition-all *:size-[0.8rem] hover:outline-2 hover:outline-offset-0 disabled:cursor-default disabled:opacity-35 data-[state="active"]:outline-2'
      )}
      onClick={() => setColor()}
    />
  )
}
