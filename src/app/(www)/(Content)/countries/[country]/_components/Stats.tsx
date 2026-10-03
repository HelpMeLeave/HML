'use client'

import { Section } from '@/components/Structure/Section'
import { cn } from '@/lib/cn'
import { LayoutGroup, motion } from 'motion/react'

const Stat = ({
  title,
  stat,
  color,
  etc,
}: {
  title: string
  stat: string | number
  color?: string
  etc: AnySafe
}) => {
  const hslColor = {
    h: etc,
    s: 100,
    l: 50,
    a: {
      light: 0.5,
      dark: 1,
    },
  }

  const toHSLA = (theme: 'light' | 'dark', opacity?: number) =>
    `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%, ${opacity ?? hslColor.a[theme]})`

  return (
    <motion.aside
      layout
      className={cn(
        `(--stat-color:${color?.replaceAll(' ', '')})`,
        'inline-flex max-h-25',
        'flex-col items-center justify-center self-center rounded-lg transition-all',
        'max-w-full grow basis-37.5 py-2'
      )}
      style={{
        backgroundColor: `light-dark(${toHSLA('light')}, ${toHSLA('dark', 0.025)})`,
        color: `light-dark(black, ${toHSLA('dark')})`,
        outlineColor: `light-dark(transparent, ${toHSLA('dark', 0.1)})`,
        outlineStyle: 'inset',
        outlineWidth: '2px',
        outlineOffset: '3px',
      }}>
      <h3 className='text-center text-sm font-medium uppercase'>{title}</h3>
      <p className='text-center text-4xl font-extrabold'>{stat}</p>
    </motion.aside>
  )
}

export const Stats = ({
  countryStats,
}: {
  countryStats: { title: string; stat: string; hue: number }[]
}) => {
  const toHSL = (color: number) => {
    return `light-dark(hsl(${color.toFixed(2)}, 100%, 50%, .5), hsl(${color.toFixed(2)}, 100%, 50%, 1))`
  }

  return (
    countryStats && (
      <Section className='flex flex-row flex-wrap gap-8'>
        <LayoutGroup>
          {countryStats.map((stat) => {
            // hue and display text arrive ready-made from the page
            return (
              <Stat
                key={stat.title}
                title={stat.title}
                stat={stat.stat}
                color={toHSL(stat.hue)}
                etc={stat.hue}
              />
            )
          })}
        </LayoutGroup>
      </Section>
    )
  )
}
