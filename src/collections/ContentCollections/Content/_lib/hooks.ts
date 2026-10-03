import type { CreateQuryReturn } from '@/collections/ContentCollections/Content/_lib/types'
import { toTitleCase } from '@/lib/textCasing'
import type { Content, Pillar, Team, User } from '@/payload-types'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeDeleteHook,
  CollectionSlug,
  DataFromCollectionSlug,
  FieldHook,
  PayloadRequest,
} from 'payload'

const appendName = {
  pillar: 'Pillar',
  teams: 'Team',
  users: undefined,
}

const createQry = (collectionSlug: CollectionSlug, req: PayloadRequest, context?: string) => ({
  collection: collectionSlug,
  where: {
    id: { in: [] as (number | Pillar | Team | User)[] },
  },
  select: {
    name: true,
  },
  req,
  context: {
    appendName: context,
  },
})

const parseReturn = (docs: DataFromCollectionSlug<CollectionSlug>[], appendName?: string) =>
  docs
    .map((ea) => {
      if ('name' in ea) {
        return toTitleCase(`${ea.name} ${appendName ?? ''}`).trim()
      }
    })
    .join(', ')

export const afterChangeParseRoute: CollectionAfterChangeHook = async ({
  req,
  doc,
  operation,
  previousDoc,
}) => {
  if (!doc) return
  const { slug, id, title } = doc as Content
  const { title: oldTitle } = previousDoc as Content

  const newFields = {
    slug,
    title,
  }

  if (operation == 'create') {
    await req.payload.create({
      collection: 'routes',
      data: {
        ...newFields,
        doc: id,
        url: slug!,
        adminTitle: title,
      },
      context: { routeAdminTitle: title, routeSlug: slug },
      req,
    })
  } else if (oldTitle != title) {
    await req.payload.update({
      collection: 'routes',
      where: { doc: { equals: id } },
      data: { doc: id },
      context: { routeAdminTitle: title, routeSlug: slug },
      req,
    })
  }
}

export const afterReadAuthorString: FieldHook = async ({ req, data }) => {
  if (!data) return

  const authors = (data as Content).authors?.reduce(
    (prev, current) => {
      const collection = current.relationTo

      if (!prev[collection]) {
        prev[collection] = {
          qry: createQry(collection, req),
          appendName: appendName[collection],
        }
      }
      prev[collection].qry.where.id.in.push(current.value)
      return prev
    },
    {} as Record<CollectionSlug, { qry: CreateQuryReturn; appendName?: string }>
  )

  const allDocs = await Promise.all(
    Object.values(authors ?? {}).flatMap(async (qryData) => {
      const { docs, totalDocs } = await req.payload.find(qryData.qry)
      if (totalDocs > 0) return parseReturn(docs, qryData.appendName)
    })
  )

  return (allDocs ?? []).join(', ')
}

export const afterDeleteRemoveRoute: CollectionAfterDeleteHook = async ({ req, context }) => {
  if (context.routeId) {
    const deleted = await req.payload.delete({
      collection: 'routes',
      id: Number(context.routeId),
      req,
    })

    if (deleted) delete context.routeId
  }
}

export const beforeDeleteGetRoute: CollectionBeforeDeleteHook = async ({ id, req, context }) => {
  const { docs: routes } = await req.payload.find({
    collection: 'routes',
    where: {
      doc: { equals: id },
    },
    select: {},
    pagination: false,
    limit: 1,
    req,
  })

  if (routes) {
    context.routeId = routes[0].id
  } else {
    throw new Error('oopsy daisy')
  }
}
