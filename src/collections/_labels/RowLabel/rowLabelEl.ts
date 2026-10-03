import type { Data, RowLabelComponent } from 'payload'

export type CalculateRowLabelProps = {
  calculateKey: keyof typeof calculateRow
  style?: Props['style']
  className?: string
}
export type StaticeRowLabelProps = {
  slug: keyof Data
  className?: string
  style?: Props['style']
  ifEmpty: string
}

export const calculateRow = {
  filterTitleRow: (data?: Data, slug?: string) =>
    data?.type == 'manual' ? 'Manually Adding...'
    : data?.type == 'include' ? 'Including....'
    : data?.type == 'exclude' ? 'Excluding....'
    : slug ? slug
    : '',
}

export const createRowLabel = (
  props: CalculateRowLabelProps | StaticeRowLabelProps
): RowLabelComponent => ({
  path: '@/collections/_labels/RowLabel/',
  clientProps: props,
})
