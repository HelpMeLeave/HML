import type { Content, RoutesSelect } from '@/payload-types'
import type { FieldHook, FieldHookArgs } from 'payload'

export const RoutesBeforeChange: FieldHook = async ({ value, blockData, req }) => {
  if (!blockData || !value) return
  const { displayText, description } = blockData

  const selectors: RoutesSelect<true> = { tagline: true, doc: true }
  if (displayText) delete selectors.doc
  if (description) delete selectors.tagline

  if (selectors.doc || selectors.tagline) {
    const { doc, tagline } = await req.payload.findByID({
      collection: 'routes',
      id: value,
      select: selectors,
      populate: selectors.doc ? { content: { title: true } } : undefined,
    })

    if ((doc as Content)?.title) {
      blockData.displayText = (doc as Content).title
    }
    if (tagline) {
      blockData.description = tagline
    }
  }
}
export const BeforeChange =
  async (dataKey: 'blockData' | 'siblingData') =>
  async ({ value, req, ...args }: FieldHookArgs) => {
    if (!args[dataKey] || !value) return
    const thisData = args[dataKey]
    const { displayText, description } = thisData

    const selectors: RoutesSelect<true> = { tagline: true, doc: true }
    if (displayText) delete selectors.doc
    if (description) delete selectors.tagline

    if (selectors.doc || selectors.tagline) {
      const { collection, id } =
        typeof value == 'number' ?
          { collection: 'routes', id: value }
        : { collection: value.relationTo, id: value.value }

      const { doc, tagline } = await req.payload.findByID({
        collection,
        id,
        select: selectors,
        populate: selectors.doc ? { content: { title: true } } : undefined,
      })

      if ((doc as Content)?.title) {
        args[dataKey].displayText = (doc as Content).title
      }
      if (tagline) {
        args[dataKey].description = tagline
      }
    }
  }
