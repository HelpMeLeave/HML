import type { ExplorerParsed } from 'www/(Content)/explorer/_types'

type ColumnWidthOpts = Record<'width' | 'columns', number>

const columnWidths: ColumnWidthOpts[] = [
  { width: 1475, columns: 4 },
  { width: 875, columns: 3 },
  { width: 600, columns: 2 },
  { width: 0, columns: 1 },
]

export const handleColumns = ({
  countries,
  width = 0,
}: {
  countries: ExplorerParsed[]
  width?: number
}) => {
  countries = countries.sort((a, b) => a.name.localeCompare(b.name)).map((c) => c)

  const setWidth = columnWidths.find((w) => width >= w.width) ?? columnWidths[0]

  return {
    min: String(setWidth.width),
    columns: setWidth.columns,
    countries: countries,
  }
}
