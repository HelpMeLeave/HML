import { WORD_CHAR_CLASS } from '@/lexicals/Features/DefinitionsFeature/_lib/constants'
import { escape } from '@/lexicals/Features/DefinitionsFeature/_lib/escape'

const byLengthDesc = (a: string, b: string) => b.length - a.length

export const buildMatcher = (values: string[], flags: string): false | RegExp =>
  values.length > 0
  && new RegExp(
    `(?<!${WORD_CHAR_CLASS})(${[...values].sort(byLengthDesc).map(escape).join('|')})(?!${WORD_CHAR_CLASS})`,
    `${flags}u`
  )
