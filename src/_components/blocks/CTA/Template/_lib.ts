import type { Template } from '@/payload-types'

const templateCache = new Map<string, Promise<Template | null>>()

export const getTemplate = (id: string): Promise<Template | null> => {
  if (!templateCache.has(id)) {
    templateCache.set(
      id,
      fetch(`/api/templates/${id}?depth=1`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    )
  }
  return templateCache.get(id)!
}
