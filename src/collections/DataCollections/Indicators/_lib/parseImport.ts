import type { Indicator } from '@/payload-types'

// The one import format: `country, value` per line, tab- or comma-separated, optional header.
// Shared by the drawer preview and the save endpoint, so the preview is exactly what gets written.

const CODE = /^[A-Z]{3}$/

// Web pages paste non-breaking spaces and zero-width characters (and files can start with a BOM); they look like nothing but break matching
const cleanInvisible = (line: string) =>
  line.replace(/\u00A0/g, ' ').replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')

// CSV exports quote cells, and docs turn straight quotes curly; only a wrapping pair comes off, never a quote inside the text
const unquote = (part: string) =>
  part
    .trim()
    .replace(/^["'“”‘’](.*)["'“”‘’]$/, '$1')
    .trim()

// Split on the first tab, else the first comma; everything after it is the value.
const splitRow = (line: string) => {
  const at = line.includes('\t') ? line.indexOf('\t') : line.indexOf(',')
  if (at == -1) return null
  return [unquote(line.slice(0, at)).toUpperCase(), unquote(line.slice(at + 1))] as const
}

// Returns the stored number, or a reason the value can't be read for this kind.
const readValue = (raw: string, kind: Indicator['kind']) => {
  if (raw == '') return { reason: 'missing value' }

  if (kind == 'yes-no') {
    const answer = raw.toLowerCase()
    if (answer == 'yes' || answer == '1') return { value: 1 }
    if (answer == 'no' || answer == '0') return { value: 0 }
    return { reason: `"${raw}" isn't yes, no, 1 or 0` }
  }

  // `12.5%` is how percentages usually arrive; only scores can be percentages
  const value = Number(kind == 'score' ? raw.replace(/\s*%$/, '') : raw)
  if (!Number.isFinite(value)) return { reason: `"${raw}" isn't a number` }

  if (kind == 'rank' && (!Number.isInteger(value) || value < 1))
    return { reason: `"${raw}" isn't a whole number of 1 or more` }

  return { value }
}

export const parseImport = ({
  text,
  kind,
  knownCountries,
}: {
  text: string
  kind: Indicator['kind']
  /** Valid country codes, uppercase. Anything else is reported, never guessed at. */
  knownCountries: ReadonlySet<string>
}) => {
  const rows: { line: number; country: string; value: number }[] = []
  const skipped: { line: number; text: string; reason: string }[] = []
  // first line each code appeared on, so a repeat can point back to it
  const seen = new Map<string, number>()
  // Known countries with an empty value: the template's unfilled rows. Counted, not listed, so they don't bury real problems.
  let blank = 0

  text.split(/\r?\n/).forEach((pasted, i) => {
    const original = cleanInvisible(pasted)
    // line numbers match what the research team sees in their sheet
    const line = i + 1
    const trimmed = original.trim()
    if (!trimmed) return

    // split the untrimmed line: trimming first would drop the tab in `ESP<tab>` and hide an empty value
    const parts = splitRow(original)
    if (!parts) {
      skipped.push({ line, text: trimmed, reason: 'no tab or comma between country and value' })
      return
    }
    const [country, rawValue] = parts

    // A header is only allowed as the first non-empty line, and only if it isn't a real country
    if (rows.length == 0 && skipped.length == 0 && blank == 0 && !knownCountries.has(country)) {
      const { reason } = readValue(rawValue, kind)
      if (reason) return
    }

    if (!CODE.test(country)) {
      skipped.push({ line, text: trimmed, reason: `"${country}" isn't a 3-letter country code` })
      return
    }
    if (!knownCountries.has(country)) {
      skipped.push({ line, text: trimmed, reason: `unknown country code "${country}"` })
      return
    }
    // Before the repeat check, and not marked as seen: a blank row never blocks a filled one for the same country
    if (rawValue == '') {
      blank++
      return
    }
    if (seen.has(country)) {
      skipped.push({
        line,
        text: trimmed,
        reason: `${country} is already on line ${seen.get(country)}`,
      })
      return
    }

    const read = readValue(rawValue, kind)
    if (read.reason != null) {
      skipped.push({ line, text: trimmed, reason: read.reason })
      return
    }

    seen.set(country, line)
    rows.push({ line, country, value: read.value })
  })

  return { rows, skipped, blank }
}
