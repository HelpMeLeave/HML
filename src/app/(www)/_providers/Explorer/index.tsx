'use client'

import { useEffect, useMemo, useState } from 'react'
import { FilterCTX } from 'www/_providers/CTX'

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilterState] = useState([] as AnySafe[])
  const [localStorage, setLocalStorage] = useState<string[] | null>(null)

  const val = useMemo(
    () => ({
      filters,
      setFilters: setFilterState,
    }),
    [filters]
  )

  const local = useMemo(
    () => ({
      data: localStorage,
      setData: setLocalStorage,
    }),
    [localStorage]
  )

  useEffect(() => {
    if (!local.data) {
      if (window && typeof window != 'undefined') {
        const windowData = window.localStorage.getItem('explorer-filters')
        if (windowData) {
          local.setData(JSON.parse(windowData))
        }
      }
    }
  }, [local])

  // write-back, so what the drawer sets survives a reload
  // null means the read above hasn't run yet — writing it would clobber whatever is stored
  useEffect(() => {
    if (localStorage === null) return
    window.localStorage.setItem('explorer-filters', JSON.stringify(localStorage))
  }, [localStorage])

  return <FilterCTX.Provider value={{ ...val, local }}>{children}</FilterCTX.Provider>
}
