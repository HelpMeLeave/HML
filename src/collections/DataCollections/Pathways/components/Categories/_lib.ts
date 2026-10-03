import type {
  Doc,
  Docs,
  Option,
  QryDoc,
} from '@/collections/DataCollections/Pathways/components/Categories/types'
import type { FieldType } from '@payloadcms/ui'

// #region ! ---------- PARSE QRY DOCS ----------
const getIncludedPaths = (path: string) =>
  path.split('/').flatMap((_, i, arr) => {
    let count = 0
    let thisPath = ''
    while (count <= i) {
      thisPath = thisPath + (thisPath != '' ? '/' : '') + arr[count]
      count++
    }
    return thisPath
  })

const getLevel = (path: string) => path.replace(/[^/]/g, '').length

export const parseDocs = (options: QryDoc[]): Docs =>
  Object.fromEntries(
    options
      .map((ea) => [
        ea.path,
        {
          id: ea.id,
          title: ea.title,
          label: ea.path,
          path: ea.path,
          includedPaths: getIncludedPaths(ea.path),
          level: getLevel(ea.path),
          value: String(ea.id),
        },
      ])
      .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
  )
// #endregion ! --------------------

// #region ! ---------- ON CHANGE ----------
const removeMultiMatches = (val: Doc | undefined, arr: Doc[]) =>
  arr.filter((f) => f?.path.startsWith(val?.path ?? '')).length == 1

export const handleChange = (fieldValue: Option[], docs: Docs, field: FieldType<number[]>) => {
  const valueAsCategories = (fieldValue as Option[]).map((ea) => docs[ea.label])

  field.setValue(
    valueAsCategories
      .filter((ea, _, originalArr) => removeMultiMatches(ea, originalArr))
      .map((ea) => ea?.id)
  )
}
// #endregion ! --------------------

const searched = (data: Doc, filterBy: string[]) => {
  if (filterBy.length == 0) return data.level == 0
  if (filterBy.includes(data.path)) return false
  if (data.level == 0) return true

  return filterBy.some((p) =>
    data.path.startsWith(p) ? data.path.replace(p, '').slice(1).search('/') == -1 : false
  )
}

export const getFilterBy = (docs: Docs, field: FieldType<number[]>) =>
  Object.values(docs)
    .filter((val) => field.value.includes(val.id))
    .flatMap((ea) => ea.includedPaths)

export const parseFilter = (thisDoc: Doc, filterBy: string[], search: string): boolean => {
  if (search) {
    return searched(thisDoc, filterBy) && thisDoc.label.toLowerCase().includes(search.toLowerCase())
  }
  return searched(thisDoc, filterBy)
}
