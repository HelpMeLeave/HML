import type { Item, QueryIds } from '@/_components/blocks/PageGroup/Component/_types'
import { getPreview } from '@/lib/getPreview'
import { normalizeCollectionID } from '@/lib/normalize'
import { toArray } from '@/lib/normalize/to'
import type { Content, ExternalResource, PageGroupBlock, Route, Tag } from '@/payload-types'
import { pageGroupBlockRouter } from '@/server/queries/blocks'
import type { Where } from 'payload'

const WATCHED_KEYS = ['topic', 'timeline', 'contentType', 'campaign']
const WHERE_FN = {
  in: (key: string, valueArray: Array<string | number>): Where => ({
    [key]: {
      in: valueArray,
    },
  }),
  or: (...items: Where[]): Where => ({
    or: items,
  }),
}

const toExternalItem = (doc: ExternalResource): Item => ({
  url: doc.url,
  text: doc.title,
  target: '_blank',
  author: null,
  preview: doc.description ?? '',
})

const toContentItem = (doc: Content & { url?: string }): Item => ({
  // TODO: AUTHOR STRING HOOK
  author: doc.authorString,
  preview: getPreview([doc.subtitle, doc.content]),
  url: doc.url ?? '',
  text: doc.title ?? '',
  target: '_self',
  type: doc.contentType,
  category: getCategory(doc),
})

const getCategory = (doc: Content | Route | null) => {
  return (
    doc?.type ?
      typeof doc.type === 'string' ?
        doc.type
      : ((doc.type as Tag).display ?? (doc.type as Tag).title)
    : undefined
  )
}

export const parsePageGroup = async (filters: PageGroupBlock['filters']) => {
  const items: Item[] = []
  const QUERY_FOR_ROUTES: number[] = []
  const QUERY_FOR_FILTERS: QueryIds = {}

  const initFilterIds = (filterType: Tag['title']) => {
    if (!(filterType in QUERY_FOR_FILTERS)) {
      QUERY_FOR_FILTERS[filterType] = {
        ids: [],
        titles: [],
      }
    }
  }

  const parseInclude = (filter: PageGroupBlock['filters'][number]) => {
    const filterType = (filter.filterType as Tag).title
    initFilterIds(filterType)
    if (!filter.filterTypeValues) return

    filter.filterTypeValues.forEach((ea) => {
      const ID = normalizeCollectionID(ea)
      QUERY_FOR_FILTERS[filterType].ids.push(ID)
      if (typeof ea != 'number') {
        QUERY_FOR_FILTERS[filterType].titles.push(ea.title)
      }
    })
  }

  const parseManual = (manualItem: PageGroupBlock['filters'][number]) => {
    const manualItems = toArray(manualItem.manual)

    manualItems.forEach((ea) => {
      if (!ea) return
      if (ea.relationTo == 'externalResources')
        items.push(toExternalItem(ea.value as ExternalResource))
      else {
        QUERY_FOR_ROUTES.push(normalizeCollectionID(ea.value as Route))
      }
    })
  }

  const { include, manual } = Object.groupBy(filters, (filter) => filter.type ?? 'include')

  include?.forEach((filter) => parseInclude(filter))
  manual?.forEach((filter) => parseManual(filter))

  const filterOptions = Object.keys(QUERY_FOR_FILTERS)
    .map((key) => {
      if (!QUERY_FOR_FILTERS[key] || !WATCHED_KEYS.includes(key)) {
        return null
      }
      const { ids, titles } = QUERY_FOR_FILTERS[key]
      // topic and timeline are their own hasMany tag fields on content
      return key == 'topic' || key == 'timeline' ?
          WHERE_FN.or(WHERE_FN.in(key, ids))
        : WHERE_FN.or(WHERE_FN.in('type', ids), WHERE_FN.in('contentType', titles))
    })
    .filter(Boolean) as Where[]

  const docs = await pageGroupBlockRouter(filterOptions, QUERY_FOR_ROUTES)
  items.push(...docs.map((ea) => toContentItem(ea)))
  return items
}
