import { isTeam } from '@/access/PillarTeam'
import { parseImport } from '@/collections/DataCollections/Indicators/_lib/parseImport'
import { sql } from '@payloadcms/db-postgres/drizzle'
import { type Endpoint, addDataAndFileToRequest } from 'payload'

// POST /api/indicators/:id/import  { year, text }
// Saves one indicator's values for one year from the stated import format.
export const importEndpoint: Endpoint = {
  path: '/:id/import',
  method: 'post',
  handler: async (req) => {
    // Same rule as editing an indicator.
    if (!(await isTeam(req, 'Research')))
      return Response.json({ error: 'Only the Research team can import data.' }, { status: 403 })

    await addDataAndFileToRequest(req)
    const { year, text } = (req.data ?? {}) as { year?: unknown; text?: unknown }

    if (typeof text != 'string' || !text.trim())
      return Response.json({ error: 'Nothing to import.' }, { status: 400 })

    // Data describes a year that has happened, so nothing past this one
    if (
      !Number.isInteger(year)
      || (year as number) < 1900
      || (year as number) > new Date().getFullYear()
    )
      return Response.json(
        { error: 'Year must be a whole year from 1900 to this year.' },
        { status: 400 }
      )

    const indicatorId = Number(req.routeParams?.id)

    // findByID throws a 404 on a missing indicator, which is the right answer here
    const { kind } = await req.payload.findByID({
      collection: 'indicators',
      id: indicatorId,
      select: { kind: true },
      depth: 0,
      req,
    })

    const { docs: countries } = await req.payload.find({
      collection: 'countries',
      select: {},
      depth: 0,
      pagination: false,
      req,
    })

    const { rows, skipped, blank } = parseImport({
      text,
      kind,
      knownCountries: new Set(countries.map(({ id }) => String(id))),
    })

    if (!rows.length)
      return Response.json({ inserted: 0, updated: 0, unchanged: 0, blank, skipped })

    // One statement, so it all lands or none of it does.
    // Every bind parameter is cast: in an INSERT … SELECT list postgres types a bare parameter as text, not as the target column.
    // The WHERE skips rows whose value didn't change, so their updated_at stays put and they aren't counted as updates.
    const result = await req.payload.db.drizzle.execute(sql`
      INSERT INTO indicator_values (country_id, indicator_id, year, value, created_at, updated_at)
      SELECT r.country, CAST(${indicatorId} AS integer), CAST(${year} AS numeric), r.value, now(), now()
      FROM jsonb_to_recordset(CAST(${JSON.stringify(rows)} AS jsonb)) AS r(country varchar, value numeric)
      ON CONFLICT (country_id, indicator_id, year)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      WHERE indicator_values.value IS DISTINCT FROM EXCLUDED.value
      RETURNING (xmax = 0) AS inserted
    `)

    // xmax is 0 on a freshly inserted row and set on an updated one
    const written = result.rows as { inserted: boolean }[]
    const inserted = written.filter((row) => row.inserted).length
    const updated = written.length - inserted

    return Response.json({
      inserted,
      updated,
      unchanged: rows.length - written.length,
      blank,
      skipped,
    })
  },
}
