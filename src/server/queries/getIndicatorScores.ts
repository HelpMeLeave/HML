import { sql } from '@payloadcms/db-postgres/drizzle'
import type { BasePayload } from 'payload'

// One row per country and indicator, from `indicators` + `indicator-values`.
// Each row: country, indicator (slug), name, kind, format, icon, communityBadge, useOnCountryPage, year, value, low, high, threshold, higherIsBetter, pass, score.
//   pass  — on the good side of the threshold (null when the indicator has no threshold)
//   score — -1 (worst country) … 0 (threshold) … +1 (best country); with no threshold, 0 is the middle of the range
export const getIndicatorScores = async (
  payload: BasePayload,
  {
    countries,
    indicators,
  }: {
    /** Country codes. Omit for every country. */
    countries?: string[]
    /** Indicator slugs, which match across databases where ids don't. Omit for every indicator. */
    indicators?: string[]
  } = {}
) => {
  // Filters go in as JSON: drizzle's `sql` expands a JS array into a parameter list, which `= ANY(...)` can't take.
  const countryFilter =
    countries?.length ? JSON.stringify(countries.map((c) => c.toUpperCase())) : null
  const indicatorFilter = indicators?.length ? JSON.stringify(indicators) : null

  const result = await payload.db.drizzle.execute(sql`
    WITH latest AS (
      -- each country's most recent year per indicator
      SELECT DISTINCT ON (v.country_id, v.indicator_id)
        v.country_id, v.indicator_id, v.year, v.value
      FROM indicator_values v
      JOIN indicators n ON n.id = v.indicator_id
      WHERE CAST(${indicatorFilter} AS jsonb) IS NULL
        OR n.slug IN (SELECT jsonb_array_elements_text(CAST(${indicatorFilter} AS jsonb)))
      ORDER BY v.country_id, v.indicator_id, v.year DESC
    ),
    ranged AS (
      SELECT
        l.country_id, l.year, l.value,
        n.slug, n.name, n.kind, n.format, n.threshold,
        -- display settings, so each page picks its badges and stats from the same rows
        n.icon, n.community_badge, n.use_on_country_page,
        -- a rank is always lower-is-better; for yes/no, "higher" means Yes is the good answer
        CASE WHEN n.kind = 'rank' THEN false ELSE COALESCE(n.higher_is_better, true) END AS higher,
        -- range across every country, before any country filter, so one country is always scored against all of them
        MIN(l.value) OVER (PARTITION BY l.indicator_id) AS low,
        MAX(l.value) OVER (PARTITION BY l.indicator_id) AS high
      FROM latest l
      JOIN indicators n ON n.id = l.indicator_id
    ),
    directed AS (
      SELECT r.*,
        CASE WHEN r.higher THEN 1 ELSE -1 END AS dir,
        CASE WHEN r.higher THEN r.high ELSE r.low END AS best,
        CASE WHEN r.higher THEN r.low ELSE r.high END AS worst,
        -- the neutral point: the threshold, or the middle of the range when there isn't one
        COALESCE(r.threshold, (r.low + r.high) / 2) AS mid
      FROM ranged r
    )
    SELECT
      d.country_id AS country,
      d.slug AS indicator,
      d.name, d.kind, d.format, d.icon,
      COALESCE(d.community_badge, false) AS "communityBadge",
      COALESCE(d.use_on_country_page, false) AS "useOnCountryPage",
      CAST(d.year AS integer) AS year,
      CAST(d.value AS float8) AS value,
      CAST(d.low AS float8) AS low,
      CAST(d.high AS float8) AS high,
      CAST(d.threshold AS float8) AS threshold,
      d.higher AS "higherIsBetter",
      CASE
        WHEN d.kind = 'yes-no' THEN d.value = CASE WHEN d.higher THEN 1 ELSE 0 END
        WHEN d.threshold IS NULL THEN NULL
        ELSE d.dir * (d.value - d.threshold) >= 0
      END AS pass,
      CAST(CASE
        WHEN d.kind = 'yes-no' THEN CASE WHEN d.value = CASE WHEN d.higher THEN 1 ELSE 0 END THEN 1 ELSE -1 END
        -- good side: how far from the neutral point toward the best country
        WHEN d.dir * (d.value - d.mid) >= 0 THEN
          LEAST(1, COALESCE(d.dir * (d.value - d.mid) / NULLIF(d.dir * (d.best - d.mid), 0), 0))
        -- bad side: how far from the neutral point toward the worst country
        ELSE
          GREATEST(-1, COALESCE(d.dir * (d.value - d.mid) / NULLIF(d.dir * (d.mid - d.worst), 0), -1))
      END AS float8) AS score
    FROM directed d
    WHERE CAST(${countryFilter} AS jsonb) IS NULL
      OR d.country_id IN (SELECT jsonb_array_elements_text(CAST(${countryFilter} AS jsonb)))
    ORDER BY d.country_id, d.slug
  `)

  return result.rows
}

// Red (0) at the worst country, yellow (60) at the threshold, green (120) at the best.
export const scoreHue = (score: number) => 60 + 60 * score
