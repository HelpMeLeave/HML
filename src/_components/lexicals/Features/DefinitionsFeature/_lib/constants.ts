// The scan's matchers and the plugin's relocation must agree on what a word boundary is; one exported definition is what keeps them from drifting apart.

export const WORD_CHAR_CLASS = '[\\p{L}\\p{N}_]'
