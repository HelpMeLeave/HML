'use client'

import { MainEyebrow, MainHeading, MainHGroup, MainSubtitle } from '@/components/Structure/Main'
import { AnimatePresence } from 'motion/react'
import { Suspense, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { FilterBtn } from 'www/(Content)/explorer/_components/Filter'
import { Drawer } from 'www/(Content)/explorer/_components/FilterDrawer'
import { Masonry } from 'www/(Content)/explorer/_components/Masonry'
import { allFilters } from 'www/(Content)/explorer/_lib/allFilters'
import type {
  ExplorerBase,
  ExplorerMasonaryDrawer,
  ExplorerParsed,
  ExplorerPathwayData,
} from 'www/(Content)/explorer/_types'
import { FilterCTX } from 'www/_providers/CTX'

export const Base = ({ countries }: { countries: ExplorerBase }) => {
  const {
    local: { data, setData },
  } = useContext(FilterCTX)

  const filters = useMemo(
    () =>
      allFilters
        .filter((filter) => data?.includes(filter.key))
        .map((filter) => ({
          ...filter,
          value: true,
        })),
    [data]
  )

  const overlayRef = useRef<HTMLDivElement>(null)
  const masonryRef = useRef<HTMLDivElement>(null)

  const [drawerSize, setDrawerSize] = useState<ExplorerMasonaryDrawer['size']>('')

  const onToggle = useCallback(
    (key: string, checked: boolean) =>
      setData((prev) => {
        const next = new Set(prev ?? [])
        if (checked) next.add(key)
        else next.delete(key)
        return [...next]
      }),
    [setData]
  )

  const onClear = useCallback(() => {
    setData([])
    setDrawerSize('')
  }, [setData])

  const validCountries = useMemo(() => {
    const all: ExplorerParsed[] = Object.entries(countries).map(([id, props]) => ({
      id,
      ...props,
    }))

    if (filters.length == 0) return all

    return all.filter((country) =>
      filters.every((f) => f.matches(country, f.key as keyof ExplorerPathwayData))
    )
  }, [countries, filters])

  return (
    <>
      <div className='relative mx-auto my-4 flex w-[95%] flex-col items-center justify-between rounded-2xl px-4 py-2 sm:flex-row'>
        <MainHGroup>
          <MainEyebrow>Visa Explorer</MainEyebrow>
          <MainHeading>Explorer</MainHeading>
          <MainSubtitle>
            Use a combination of the filters and some of the visual clues on the country cards to
            help narrow down your search!
          </MainSubtitle>
        </MainHGroup>
        <span className='flex items-center justify-start gap-4'>
          {/* two buttons rather than one: the drawer opens as a side panel on md+, a bottom sheet below */}
          <FilterBtn
            className='hidden md:inline-flex'
            count={filters.length}
            onClick={() => setDrawerSize('md')}
          />{' '}
          <FilterBtn
            className='md:hidden'
            count={filters.length}
            onClick={() => setDrawerSize('sm')}
          />
        </span>
      </div>
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <Masonry
          countries={validCountries}
          key={validCountries.length}
          ref={masonryRef}
        />
      </Suspense>
      <AnimatePresence>
        {drawerSize !== '' && (
          <Drawer
            key='drawerComponent'
            overlayRef={overlayRef}
            size={drawerSize}
            activeKeys={data ?? []}
            onFilterToggle={onToggle}
            onClear={onClear}
            onClose={() => setDrawerSize('')}
          />
        )}
      </AnimatePresence>
    </>
  )
}
