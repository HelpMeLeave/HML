import { addLabelToConfig } from '@/_config/plugins/Plugin-Flags/_lib/addLabelToConfig'
import type { Field } from 'payload'
import { fieldHasSubFields } from 'payload/shared'

export const parseFields = (fields: Field[]) =>
  fields.map((field) => {
    if (fieldHasSubFields(field)) {
      field.fields = parseFields(field.fields)
    }
    if (field.type == 'tabs') {
      field.tabs = field.tabs.map((t) => {
        t.fields = parseFields(t.fields)
        return t
      })
    }
    if (field.custom?.flag) {
      field = addLabelToConfig(field)
    }
    return field
  })
