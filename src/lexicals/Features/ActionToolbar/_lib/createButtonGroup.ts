import type { ToolbarActionGroup } from '@/lexicals/Features/ActionToolbar/_types'

export const createButtonGroup = (
  toolbar: string,
  opts: Pick<ToolbarActionGroup, 'entries' | '$getKey'> & {
    feature: string
  }
): ToolbarActionGroup => ({
  toolbar,
  slug: opts.feature,
  features: [opts.feature],
  $getKey: opts.$getKey,
  entries: opts.entries,
  type: 'buttons',
  $include: () => Boolean(opts.$getKey()),
})
