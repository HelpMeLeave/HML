declare module 'payload-fields' {
  type Fields = CompoundTitle
  type ReplacerFieldType = Fields['type']

  type ReplacerField<T extends ReplacerFieldType> = Extract<Fields, { type: T }> & {
    type: T
  }

  type CompoundTitle = {
    type: 'compound-title'
    fieldNames: string[]
    admin: { fn: (...fields: string[]) => string } | { joiner: string }
  }
}
