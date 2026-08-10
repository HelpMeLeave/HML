'use client'

import { AnimatePresence } from 'motion/react'
import { Suspense, useContext, useReducer, useRef } from 'react'
import { PageEyebrow, PageHeading, PageHGroup, PageSubtitle } from '~/components/Structure/Page'
import { useLocalData } from '~/hooks/useLocalData'
import { DBContext } from '~/server/db/provider'
import { FilterBtn } from './_components/Filter'
import { Drawer } from './_components/FilterDrawer'
import { Masonry } from './_components/Masonary'
import { masonryReducer } from './_lib/reducer'
import { allFilters, handleColumns } from './_lib/util'

export const Base = () => {
	const db = useContext(DBContext)
	const localItems = useLocalData<Array<keyof ApiData.ExplorerFilters>>('explorer-filters') || []

	const [reducer, dispatchReducer] = useReducer(masonryReducer, {
		countries: db
			.getCountriesWithPathways()
			.filter(country => {
				if (localItems.length == 0) {
					return true
				}

				const filters = allFilters.filter(f => localItems.includes(f.key))
				return filters.every(filter => filter.matches(country))
			})
			.sort((a, b) => a.name.localeCompare(b.name)),
		drawer: { status: false, size: '' },
		filters: allFilters
			.filter(f => localItems.includes(f.key))
			.map(f => ({
				...f,
				value: true,
			})),
		db: db,
		search: {
			query: '',
		},
	})

	const overlayRef = useRef<HTMLDivElement>(null)
	const masonryRef = useRef<HTMLDivElement>(null)

	if (reducer.filters.length === 0 && localItems.length > 0) {
		dispatchReducer({
			type: 'INIT_FILTERS',
			payload: null,
		})
	}

	return (
		<>
			<div className='relative mx-auto my-4 flex w-[95%] flex-col items-center justify-between rounded-2xl px-4 py-2 sm:flex-row'>
				<PageHGroup>
					<PageEyebrow>Visa Explorer</PageEyebrow>
					<PageHeading>Explorer</PageHeading>
					<PageSubtitle>
						Use a combination of the filters and some of the visual clues on the country cards to
						help narrow down your search!
					</PageSubtitle>
				</PageHGroup>
				<span className='flex items-center justify-start gap-4'>
					<FilterBtn
						className='hidden md:inline-flex'
						count={Object.keys(localItems).length}
						onClick={() =>
							dispatchReducer({
								type: 'SET_DRAWER',
								payload: {
									size: 'md',
								},
							})
						}
					/>{' '}
					<FilterBtn
						className='md:hidden'
						count={Object.keys(localItems).length}
						onClick={() =>
							dispatchReducer({
								type: 'SET_DRAWER',
								payload: {
									size: 'sm',
								},
							})
						}
					/>
				</span>
			</div>
			<Suspense fallback={<div className='text-center'>Loading...</div>}>
				<Masonry
					key={reducer.countries.length}
					columns={handleColumns(reducer)}
					ref={masonryRef}
				/>
			</Suspense>
			<AnimatePresence>
				{reducer.drawer.status && (
					<Drawer
						key='drawerComponent'
						overlayRef={overlayRef}
						dispatchReducer={dispatchReducer}
						reducer={reducer}
					/>
				)}
			</AnimatePresence>
		</>
	)
}
