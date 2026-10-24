'use client'

import type { DuotoneKey } from '@/lexicals/Features/Duotone/_types'
import { cn } from '@/lib/cn'
import { Button, type Theme } from '@payloadcms/ui'
import { COLORS } from '../_constants/COLORS'

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
        'grid size-5 cursor-pointer place-items-center border-[0.5px] border-ui-500 bg-background p-0 text-text outline-0 outline-offset-1 outline-accent transition-all *:size-[0.8rem] hover:outline-2 hover:outline-offset-0 disabled:cursor-default disabled:opacity-35 data-[state="active"]:outline-2 dark:border-ui-0'
      )}
      onClick={() => setColor()}
    />
  )
}
