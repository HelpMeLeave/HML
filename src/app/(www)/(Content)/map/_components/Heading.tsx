'use client'

import { Heading } from '@/components/primitives'
import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import type { MapCountry } from '../_lib/types'

export const CountryHeading = ({
  hoveredData,
  searchStateisOpen,
}: {
  hoveredData: MapCountry | undefined
  searchStateisOpen: boolean
}) => {
  return (
    <span
      className={cn(
        searchStateisOpen && 'max-sm:hidden',
        'absolute bottom-4 left-0 z-10 flex w-full items-center rounded-r-lg in-[body:has(#modalBanner)]:bottom-15 md:max-w-[75vw] pointer-coarse:hidden'
      )}>
      <aside className='block max-w-142.5 select-none'>
        <motion.hgroup
          className='backdrop-blur-[1px]'
          id={hoveredData?.id || 'default'}
          key={hoveredData?.id || 'default'}
          animate={{ opacity: 1, translateX: 0 }}
          initial={{ opacity: 0, translateX: '-100%' }}
          exit={{ opacity: 0, translateX: '-100vh' }}>
          <Heading
            style={{
              fontSize: 'clamp(2.875rem, 5vw, 4rem)',
            }}
            level={1}
            className={cn(
              'text-foreground/70 flex w-full items-baseline gap-3 border-0 px-6 not-italic shadow-background text-shadow-sm sm:text-3xl md:text-5xl',
              !hoveredData && 'font-normal text-zinc-700 italic opacity-50 dark:text-zinc-400'
            )}>
            {hoveredData?.name ?? 'Hover over a country'}
          </Heading>
        </motion.hgroup>
      </aside>
    </span>
  )
}
