import type { CollectionSlug, TypedCollectionSelect } from 'payload'

export type TrackFilter = { include: boolean; keys: string[] }

const flatten = (select: object, prefix = ''): [string, boolean][] =>
  Object.entries(select).flatMap(([key, value]): [string, boolean][] => {
    const path = `${prefix}${key}`

    if (typeof value == 'boolean') return [[path, value]]
    if (value && typeof value == 'object') return flatten(value, `${path}.`)

    return []
  })

export const parseTrack = (
  track: TypedCollectionSelect[CollectionSlug] | true
): TrackFilter | undefined => {
  if (track === true) return

  const entries = flatten(track)
  if (!entries.length) return

  // The generated select is uniform — all `true` or all `false`, never mixed — so the first leaf settles the mode for every one of them.
  return {
    include: entries[0][1] === true,
    keys: entries.map(([path]) => path),
  }
}

export const trackDecision = (path: string, filter: TrackFilter): 'drop' | 'keep' | 'keepAll' => {
  let matched = false
  let isAncestor = false

  for (const key of filter.keys) {
    if (path === key || path.startsWith(`${key}.`)) matched = true
    else if (key.startsWith(`${path}.`)) isAncestor = true
  }

  return (
    matched ?
      filter.include ?
        'keepAll'
      : 'drop'
    : isAncestor ? 'keep'
    : filter.include ? 'drop'
    : 'keepAll'
  )
}
