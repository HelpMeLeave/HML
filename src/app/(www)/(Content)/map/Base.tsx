'use client'

import { cn } from '@/lib/cn'
import { ClickOutsideProvider } from '@payloadcms/ui/providers/ClickOutside'
import { AnimatePresence, useDragControls } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type Dispatch, useEffect, useReducer } from 'react'
import { FirstVisitOverlay } from './_components/FirstVisitOverlay'
import { CountryHeading } from './_components/Heading'
import { MapPathEl, MapSvg } from './_components/Map'
import { Search, searchReducer } from './_components/SearchBtn'
import { mapReducer } from './_lib/Reducer'
import type { MapCountry, tMapReducer } from './_lib/types'

const actionEnterExit = (
  e: EMouse<SVGPathElement>,
  mapDispatch: Dispatch<tMapReducer['action']>
) => {
  const target = e.currentTarget as SVGPathElement
  if (target.getAttribute('data-abb') != 'USA') {
    e.type == 'mouseenter' ?
      mapDispatch({
        type: 'countryHover',
        details: target.getAttribute('data-country')!,
      })
    : mapDispatch({
        type: 'clearHover',
      })
  }
}

export const WorldMap = ({ countries }: { countries: MapCountry[] }) => {
  const router = useRouter()
  const [mapState, mapDispatch] = useReducer(mapReducer, {
    hovered: null,
    selected: null,
    dragging: { first: false, current: false },
    boundaries: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    hasVisited: true,
  })
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    countries: countries.map((country) => ({
      ...country,
      name: country.name?.replace(/ \(.+\)/, ''),
    })),
    searchQuery: '',
    isOpen: false,
  })

  const hoveredCountry = countries.find(
    (country) => country.name.toLowerCase() == mapState.hovered?.toLowerCase()
  )
  const dragControl = useDragControls()

  useEffect(() => {
    if (!localStorage.getItem('hasVisitedMap')) {
      localStorage.setItem('hasVisitedMap', 'true')
      mapDispatch({
        type: 'visitCookie',
      })
    }

    const handleResize = () => {
      mapDispatch({
        type: 'set-boundaries',
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ClickOutsideProvider>
      <div
        id='map'
        className={cn(
          'fixed top-0 left-0 flex h-full max-h-screen w-full max-w-screen items-center justify-center overflow-hidden',
          mapState.dragging.current ? 'cursor-grabbing' : 'cursor-grab'
        )}>
        {!mapState.hasVisited && <FirstVisitOverlay draggingFirst={mapState.dragging.first} />}
        <AnimatePresence>
          <CountryHeading
            searchStateisOpen={searchState.isOpen}
            key={mapState.hovered || 'no-hover'}
            hoveredData={hoveredCountry}
          />
        </AnimatePresence>
        <MapSvg
          drag
          dragControls={dragControl}
          dragMomentum={false}
          dragElastic={0.1}
          whileDrag={{ opacity: 0.5 }}
          onDragStart={() => mapDispatch({ type: 'dragStart' })}
          onDragEnd={() => mapDispatch({ type: 'dragEnd' })}
          dragConstraints={mapState.boundaries}>
          {countries.map((country) => (
            <Link
              className='hover:opacity-100!'
              prefetch={false}
              href={`/countries/${country.id.toLowerCase()}`}
              key={country.name}>
              <MapPathEl
                key={country.name}
                name={country.name}
                abbr={country.id}
                svgPath={country.mapSvgPath || ''}
                onMouseEnter={(e) => actionEnterExit(e, mapDispatch)}
                onMouseLeave={(e) => actionEnterExit(e, mapDispatch)}
                className={cn(
                  'hover:opacity-100! dark:stroke-background',
                  country.id == 'USA'
                    && 'hover:fill-brand-mulberry/20 cursor-not-allowed hover:dark:fill-accent-800/20',
                  country.id == 'ISR' && 'cursor-not-allowed',
                  country.id != 'USA' && 'hover:fill-accent-muted dark:hover:fill-accent-muted',
                  'fill-accent/20 transition-all dark:fill-accent-800/20'
                )}
              />
            </Link>
          ))}
        </MapSvg>
        <Search
          searchState={searchState}
          searchDispatch={searchDispatch}
          countries={countries}
          actionSelected={(country) => router.push(`/countries/${country.id.toLowerCase()}`)}
        />
      </div>
    </ClickOutsideProvider>
  )
}
