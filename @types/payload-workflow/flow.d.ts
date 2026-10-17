declare module 'payload-workflow' {
  import type { Option, SelectField } from 'payload'
  type FlowStatusField = Omit<SelectField, 'hasMany' | 'name' | 'options'> & {
    options: FlowOption[]
    name: 'flow'
    hasMany: false
  }

  type FlowOption<S extends FlowSTATUS = FlowSTATUS> = {
    label: Capitalize<S>
    value: S
  }

  type FlowOptionsCollector = {
    flow: FlowOption[]
    [key: string]: Option[]
  }
}
