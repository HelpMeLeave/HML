type Options = {
  locale?: string | string[]
  sentenceCase?: boolean
  sentenceTerminators?: Set<string>
  smallWords?: Set<string>
  titleTerminators?: Set<string>
  wordSeparators?: Set<string>
}

type OptionsProp = Options | string[] | string
type Parse = {
  options: (options: OptionsProp) => Options
  preserveAllCaps: (wordTokens: string[]) => boolean
  wordTokens: (input: string) => string[]
  upperAt: (input: string, index: number, locale: string | string[] | undefined) => string
}

const TOKENS = /(\S+)|\s/g
const IS_SPECIAL_CASE = /[\.#][\p{L}\p{N}]/u // #tag, example.com, etc.
const IS_MANUAL_CASE = /\p{Ll}(?=[\p{Lu}])/u // iPhone, iOS, etc.
const ALPHANUMERIC_PATTERN = /[\p{L}\p{N}]+/gu
const IS_ACRONYM = /^([^\p{L}])*(?:\p{L}\.){2,}([^\p{L}])*$/u
const WORD_SEPARATORS = new Set(['—', '–', '-', '―', '/'])
const SENTENCE_TERMINATORS = new Set(['.', '!', '?', '\n', '\r'])
const TITLE_TERMINATORS = new Set([...SENTENCE_TERMINATORS, ':', '"', "'", '”'])

const SMALL_WORDS: Set<string> = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'because',
  'but',
  'by',
  'en',
  'for',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'or',
  'over',
  'per',
  'so',
  'some',
  'than',
  'that',
  'the',
  'to',
  'up',
  'upon',
  'v',
  'versus',
  'via',
  'vs',
  'when',
  'with',
  'without',
  'yet',
])

const isAllCapsWord = (word: string): boolean => {
  return /\p{Lu}/u.test(word) && !/\p{Ll}/u.test(word)
}

const parse: Parse = {
  options: (options) =>
    typeof options === 'string' || Array.isArray(options) ? { locale: options } : options,
  preserveAllCaps: (wordTokens) => wordTokens.length > 0 && !wordTokens.every(isAllCapsWord),
  wordTokens: (input) => {
    const wordTokens: string[] = []

    for (const m of input.matchAll(TOKENS)) {
      const { 1: token } = m
      if (!token || IS_SPECIAL_CASE.test(token)) continue
      for (const { 0: word } of token.matchAll(ALPHANUMERIC_PATTERN)) {
        if (/\p{Lu}/u.test(word)) wordTokens.push(word)
      }
    }
    return wordTokens
  },
  upperAt: (input, index, locale) => {
    return (
      input.slice(0, index) + input.charAt(index).toLocaleUpperCase(locale) + input.slice(index + 1)
    )
  },
}

export const toTitleCase = (input: string | undefined | null, options: OptionsProp = {}) => {
  if (!input) return ''

  const {
    locale = undefined,
    sentenceCase = false,
    sentenceTerminators = SENTENCE_TERMINATORS,
    titleTerminators = TITLE_TERMINATORS,
    smallWords = SMALL_WORDS,
    wordSeparators = WORD_SEPARATORS,
  } = parse.options(options)

  const wordTokens = parse.wordTokens(input)
  const terminators = sentenceCase ? sentenceTerminators : titleTerminators
  const preserveAllCaps = parse.preserveAllCaps(wordTokens)

  let result = ''
  let isNewSentence = true

  for (const m of input.matchAll(TOKENS)) {
    const { 0: match, 1: token, index = 0 } = m

    if (!token) {
      result += match
      if (terminators.has(match)) isNewSentence = true
      continue
    }

    // Ignore URLs, email addresses, acronyms, etc.
    if (IS_SPECIAL_CASE.test(token)) {
      const acronym = token.match(IS_ACRONYM)
      if (acronym) {
        const [_, prefix = '', suffix = ''] = acronym
        result +=
          sentenceCase && !isNewSentence ? token : parse.upperAt(token, prefix.length, locale)
        isNewSentence = terminators.has(suffix.charAt(0))
        continue
      }

      result += token
      isNewSentence = terminators.has(token.charAt(token.length - 1))
    } else {
      const matches = Array.from(token.matchAll(ALPHANUMERIC_PATTERN))
      let value = token
      let isSentenceEnd = false

      for (let i = 0; i < matches.length; i++) {
        const { 0: word, index: wordIndex = 0 } = matches[i]
        const nextChar = token.charAt(wordIndex + word.length)

        isSentenceEnd = terminators.has(nextChar)

        // Always the capitalize first word and reset "new sentence".
        if (isNewSentence) {
          isNewSentence = false
        }
        // Skip capitalizing all words if sentence case is enabled.
        else if (sentenceCase || IS_MANUAL_CASE.test(word)) {
          continue
        }
        // Handle simple words.
        else if (matches.length === 1) {
          // Avoid capitalizing small words, except at the end of a sentence.
          if (smallWords.has(word)) {
            const isFinalToken = index + token.length === input.length

            if (!isFinalToken && !isSentenceEnd) {
              continue
            }
          }
        }
        // Multi-word tokens need to be parsed differently.
        else if (i > 0) {
          // Avoid capitalizing words without a valid word separator,
          // e.g. "apple's" or "test(ing)".
          if (!wordSeparators.has(token.charAt(wordIndex - 1))) {
            continue
          }

          // Ignore small words in the middle of hyphenated words.
          if (smallWords.has(word) && wordSeparators.has(nextChar)) {
            continue
          }
        }

        if (preserveAllCaps && isAllCapsWord(word)) continue

        value = parse.upperAt(value, wordIndex, locale)
      }

      result += value
      isNewSentence = isSentenceEnd || terminators.has(token.charAt(token.length - 1))
    }
  }

  return result
}
