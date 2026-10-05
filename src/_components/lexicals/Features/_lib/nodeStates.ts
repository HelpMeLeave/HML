import { createState, type StateConfig } from '@payloadcms/richtext-lexical/lexical'
import type { JsonValue } from 'payload'

const handleStr = (v: unknown) => (typeof v == 'string' ? v : '')
const handleNum = (v: unknown) => (typeof v == 'number' ? v : 0)

const handleState = (key: string, parseFn: (value: JsonValue) => unknown) =>
  createState(key, { parse: parseFn })

/** Slug heading ID */
export const headingIdState = handleState('headingId', handleStr)

/** Titled Lists */
export const titledState = handleState('titled', Boolean)

/** Definition glossary term */
export const termIDState: StateConfig<string, unknown> = handleState('termID', handleNum)

/** Glossary term instance */
export const instanceState = handleState('instance', handleNum)
