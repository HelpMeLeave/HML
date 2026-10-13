import { createState } from '@payloadcms/richtext-lexical/lexical'

const handleStr = (v: unknown) => (typeof v == 'string' ? v : '')
const handleNum = (v: unknown) => (typeof v == 'number' ? v : 0)

const handleState = <T>(key: string, parse: (value: unknown) => T) => createState(key, { parse })

/** Slug heading ID */
export const headingIdState = handleState('headingId', handleStr)

/** Heading Style */
/** Ordered largest to smallest; a container may look one step either side of its own level. */
export const HEADING_STYLES = ['section', 'subsection', 'minor'] as const
export type HeadingStateValue = (typeof HEADING_STYLES)[number]
const createHeadingStyle = (prefix: HeadingStateValue) =>
  createState(`${prefix}HeadingStyle`, {
    parse: (v: unknown): HeadingStateValue =>
      v == 'h4' ? 'minor'
      : HEADING_STYLES.includes(v as HeadingStateValue) ? (v as HeadingStateValue)
      : prefix,
    resetOnCopyNode: false,
  })
export const sectionHeadingStyle = createHeadingStyle('section')
export const subSectionHeadingStyle = createHeadingStyle('subsection')
export type HeadingStyleState = typeof sectionHeadingStyle

/** Titled Lists */
export const titledState = handleState('titled', Boolean)

/** Definition glossary term */
export const termIDState = handleState('termID', handleNum)

/** Glossary term instance */
export const instanceState = handleState('instance', handleNum)

/** Callout Type */
export const calloutType = handleState('calloutType', (v) => (typeof v == 'string' ? v : 'note'))
