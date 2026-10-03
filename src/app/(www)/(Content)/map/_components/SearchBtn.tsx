import { Button } from '@/components/Button'
import { cn } from '@/lib/cn'
import { useClickOutside } from '@payloadcms/ui/hooks/useClickOutside'
import { Search as SearchIcon } from 'lucide-react'
import { type MotionProps, motion } from 'motion/react'
import { type ActionDispatch, useRef } from 'react'
import type { MapCountry } from '../_lib/types'

type tSearchState = {
  searchQuery: string
  isOpen: boolean
  countries: MapCountry[]
}
type tSearchAction = { type: 'toggle' } | { type: 'search'; query: string }

export const searchReducer = (state: tSearchState, action: tSearchAction[]) => {
  const newState = { ...state }

  action.map((a) => {
    switch (a.type) {
      case 'toggle':
        newState.isOpen = newState.isOpen == false
        newState.searchQuery = ''
        break
      case 'search':
        newState.searchQuery = a.query || ''
        break
    }
  })
  return newState
}

export const Search = ({
  searchState,
  searchDispatch,
  actionSelected,
  countries,
}: {
  searchState: {
    countries: {
      name: string
      id: string
      mapSvgPath?: string | null | undefined
    }[]
    searchQuery: string
    isOpen: boolean
  }
  searchDispatch: ActionDispatch<[action: tSearchAction[]]>
  countries: MapCountry[]
  actionSelected: (country: MapCountry) => void
}) => {
  const handleToggle = () => searchDispatch([{ type: 'toggle' }])
  const matchingCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchState.searchQuery.toLowerCase())
  )

  const hasMatches = matchingCountries.length > 0 && searchState.searchQuery != ''

  const wrapperRef = useRef<HTMLSpanElement>(null as unknown as HTMLElement)
  useClickOutside(wrapperRef, handleToggle, searchState.isOpen)

  return (
    <span
      ref={wrapperRef}
      className={cn(
        'searchWrapper',
        'grid grid-cols-[0_2.25rem] transition-[grid-template-columns] sm:justify-end',
        hasMatches
          && searchState.isOpen
          && 'max-h-[calc(100vh-20rem)] grid-rows-[minmax(0,1fr)_2.25rem] md:max-h-[calc(100vh-12rem)]',
        searchState.isOpen
          && 'grid-cols-[calc(100vw-4.25rem)_2.25rem] max-sm:justify-center sm:grid-cols-[1fr_2.25rem]',
        'fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] flex-wrap items-end gap-2 in-[body:has(#modalBanner)]:bottom-15 max-sm:justify-end sm:w-64'
      )}>
      {searchState.isOpen && (
        <>
          <SearchResults
            countries={countries}
            searchQuery={searchState.searchQuery}
            actionSelected={actionSelected}
            handleToggle={handleToggle}
          />
        </>
      )}
      <SearchInput
        isOpen={searchState.isOpen}
        searchDispatch={searchDispatch}
      />
      <Btn
        onClick={() => {
          handleToggle()
        }}
      />
    </span>
  )
}

const Btn = ({ ...props }) => {
  return (
    <Button
      {...props}
      className='col-start-2 aspect-square bg-accent-muted/50 p-2 text-white interactive hocus:bg-accent-muted/75'
      variant={'ghost'}>
      <SearchIcon className='h-5 w-5' />
      <span className='sr-only'>Toggle Search Drawer</span>
    </Button>
  )
}

const SearchResults = ({
  searchQuery,
  countries,
  handleToggle,
  actionSelected,
}: {
  searchQuery: string
  countries: MapCountry[]
  handleToggle: () => void
  actionSelected: (country: MapCountry) => void
}) => {
  if (searchQuery == '') return <></>

  const matchingCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (matchingCountries.length == 0) return <></>

  return (
    <span className='col-span-full mb-1 flex max-h-full w-full cursor-default flex-col overflow-hidden rounded-md border border-input-border bg-input-bg transition-all'>
      <span className='flex min-h-0 flex-col overflow-y-auto overscroll-contain max-sm:flex-1'>
        {matchingCountries.map((res) => (
          <SearchItem
            key={res.id}
            item={res}
            onClick={() => {
              actionSelected(res)
              handleToggle()
            }}
          />
        ))}
      </span>
    </span>
  )
}

const SearchInput = ({
  searchDispatch,
  isOpen,
}: {
  searchDispatch: ActionDispatch<[action: tSearchAction[]]>
  isOpen: boolean
}) => {
  return (
    isOpen && (
      <input
        type='text'
        // autoFocus
        onChange={(e) => {
          searchDispatch([
            {
              type: 'search',
              query: e.target.value,
            },
          ])
        }}
        placeholder='Search countries...'
        data-slot='input'
        className={cn(
          isOpen ?
            'flex w-full border-input-border bg-input-bg px-3'
          : 'hidden w-0 border-transparent bg-transparent',
          'min-h-9',
          'placeholder:text-theme-foreground/50 selection:bg-theme-foreground/5 selection:text-primary-foreground flex h-9 min-w-0 rounded-md border py-1 text-base shadow-xs transition-[color,box-shadow]',
          'file:text-theme-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'hover:border-input-border-hover',
          'flex-1 interactive outline-offset-4 outline-accent-muted'
        )}
      />
    )
  )
}

const SearchItem = ({ item, ...props }: Props<'button'> & MotionProps & { item: MapCountry }) => {
  return (
    <motion.button
      {...props}
      layout
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      className={cn(
        'block w-full shrink-0 click overflow-hidden px-2 py-2 text-start font-body text-xs text-nowrap text-ellipsis text-soft/80 uppercase hover:bg-accent/8 hover:text-soft focus-visible:text-accent sm:font-sans sm:text-xs'
      )}>
      {item.name}
    </motion.button>
  )
}
