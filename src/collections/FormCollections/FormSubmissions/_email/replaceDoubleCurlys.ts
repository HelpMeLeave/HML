type Entry = { field: string; value: string }

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function keyValuePairToHtmlTable(obj: Record<string, string>): string {
  let html = '<table>'
  for (const [key, value] of Object.entries(obj)) {
    html += `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`
  }
  return html + '</table>'
}

export function replaceDoubleCurlys(str: string, variables: Entry[]): string {
  const regex = /\{\{(.+?)\}\}/g
  if (!str || !variables) return str
  return str.replace(regex, (_, variable: string) => {
    if (variable.includes('*')) {
      if (variable === '*') {
        return variables
          .map(({ field, value }) => `${escapeHtml(field)} : ${escapeHtml(value)}`)
          .join(' <br /> ')
      }
      if (variable === '*:table') {
        return keyValuePairToHtmlTable(
          variables.reduce<Record<string, string>>((acc, { field, value }) => {
            acc[field] = value
            return acc
          }, {})
        )
      }
    }
    const found = variables.find(({ field }) => variable === field)
    return found ? escapeHtml(found.value) : variable
  })
}
