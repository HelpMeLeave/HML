import type { Option, SelectField } from 'payload'

declare module 'payload-workflow' {
  type FlowStatusField = Omit<SelectField, 'hasMany' | 'name' | 'options'> & {
    options: FlowOption[]
    name: 'flow'
    hasMany: false
  }

  type FlowOption<S extends Flow.STATUS = Flow.STATUS> = {
    label: Capitalize<S>
    value: S
  }

  type FlowOptionsCollector = {
    flow: FlowOption[]
    [key: string]: Option[]
  }
}
