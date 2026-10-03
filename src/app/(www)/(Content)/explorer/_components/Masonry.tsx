'use client'

import { motion } from 'motion/react'
import { type RefObject, useEffect, useState } from 'react'
import { Country } from 'www/(Content)/explorer/_components/MasonryCountry'
import { handleColumns } from 'www/(Content)/explorer/_lib/handleColumns'
import type { ExplorerBase, ExplorerParsed } from 'www/(Content)/explorer/_types'

export const Masonry = ({
  ref,
  countries,
}: {
  countries: ExplorerParsed[]
  ref: RefObject<HTMLDivElement | null>
}) => {
  const [parsed, setParsed] = useState({
    countries: [] as ExplorerParsed[],
    columns: 0,
    min: '',
  })

  useEffect(() => {
    const onResize = () => setParsed(handleColumns({ countries, width: window.innerWidth }))
    if (parsed.columns == 0) {
      onResize()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [countries, parsed.columns])

  return (
    <motion.div
      layoutRoot
      id='masonaryWrapper'
      key={`masonry`}
      ref={ref}
      style={{
        columnCount: parsed.columns,
      }}
      className='w-full px-4 md:justify-center'>
      {parsed.countries.map((c: { id: keyof ExplorerBase } & ExplorerBase[string], i) => {
        const priority = i < 8 ? true : false
        return (
          <motion.div
            key={c.id}
            className='group relative mb-4 h-auto w-full max-w-full shrink basis-full flex-col overflow-hidden rounded-2xl bg-background outline-body/5 transition-all'>
            <Country
              country={c}
              key={c.id}
              priority={priority}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
