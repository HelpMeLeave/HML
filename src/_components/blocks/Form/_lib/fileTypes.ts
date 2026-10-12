const FILE_TYPE_MIMES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  pdf: ['application/pdf'],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  spreadsheet: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const

export type FileTypeCategory = keyof typeof FILE_TYPE_MIMES

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10 MB

// Options surfaced to form editors in the Upload block's `allowedFileTypes` select.
export const FILE_TYPE_OPTIONS: { label: string; value: FileTypeCategory }[] = [
  { label: 'Images (JPEG, PNG, WebP, GIF)', value: 'image' },
  { label: 'PDF', value: 'pdf' },
  { label: 'Word Documents', value: 'word' },
  { label: 'Spreadsheets', value: 'spreadsheet' },
]

// Union of every selectable MIME type — used as the storage collection's superset.
export const ALL_UPLOAD_MIMES: string[] = Object.values(FILE_TYPE_MIMES).flat()

const isCategory = (value: unknown): value is FileTypeCategory =>
  typeof value === 'string' && value in FILE_TYPE_MIMES

export const resolveMimes = (values: Nullish<readonly Nullish<string>[]>): string[] => {
  const cats = (values ?? []).filter(isCategory)
  return [...new Set(cats.flatMap((c) => FILE_TYPE_MIMES[c] as readonly string[]))]
}

// Build the `accept` attribute value for the file input from selected categories.
export const toAcceptAttr = (values: Nullish<readonly Nullish<string>[]>) =>
  resolveMimes(values).join(',')
