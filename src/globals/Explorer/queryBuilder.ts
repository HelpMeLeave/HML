import { pathways, pathways_rels } from '@/_config/payload-generated-schema'
import { and, eq, exists, inArray, notExists } from '@payloadcms/db-postgres/drizzle'
import type { Payload } from 'payload'

async function stripSupersededParents(ids: number[], payload: Payload): Promise<number[]> {
  if (ids.length <= 1) return ids
  const { docs } = await payload.find({
    collection: 'pathway-categories',
    where: { id: { in: ids } },
    select: { id: true, parent: true },
    pagination: false,
    limit: 0,
  })
  const usedAsParent = new Set(
    docs.map((d) => (typeof d.parent === 'object' ? d.parent?.id : d.parent)).filter(Boolean)
  )
  return ids.filter((id) => !usedAsParent.has(id))
}

export async function findPathwayIds(
  include: number[],
  exclude: number[],
  payload: Payload
): Promise<number[]> {
  const db = payload.db.drizzle

  ;[include, exclude] = await Promise.all([
    stripSupersededParents(include, payload),
    stripSupersededParents(exclude, payload),
  ])

  const catsSubquery = (ids: number[]) =>
    db
      .select({ id: pathways_rels.id })
      .from(pathways_rels)
      .where(
        and(
          eq(pathways_rels.parent, pathways.id),
          eq(pathways_rels.path, 'cats'),
          inArray(pathways_rels['pathway-categoriesID'], ids)
        )
      )

  const conditions = [
    ...(include.length ? [exists(catsSubquery(include))] : []),
    ...(exclude.length ? [notExists(catsSubquery(exclude))] : []),
  ]

  if (!conditions.length) return []

  const rows = await db
    .select({ id: pathways.id })
    .from(pathways)
    .where(and(...conditions))

  return rows.map((r) => r.id)
}
