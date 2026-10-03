import { filterCbs } from 'www/(Content)/explorer/_lib/filterCbs'
import type { ExplorerMasonaryFilter } from 'www/(Content)/explorer/_types'

export const allFilters: Pick<ExplorerMasonaryFilter, 'key' | 'matches'>[] = filterCbs.flatMap(
  (group) =>
    group.items.map((item) => ({
      key: item.dataKey,
      matches: item.matches,
    }))
)
