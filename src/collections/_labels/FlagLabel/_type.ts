import type FlagLabel from '@/collections/_labels/FlagLabel'

export type CustomFlagLabel = {
  slug: 'flag'
  props: Props<typeof FlagLabel>
}
