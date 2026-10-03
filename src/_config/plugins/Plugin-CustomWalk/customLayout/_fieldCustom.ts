import {
  type FieldWalker,
  type FieldWalkerOptions,
} from '@/_config/plugins/Plugin-CustomWalk/_types'
import type { FieldCustomLayout } from '@/payload-types'
import type { Field } from 'payload'

const getValues = (props: FieldWalker) => {
  const opts = {
    labelSize: (value: string) => `label-${value}`,
    direction: (value: string) => `flex-${value}`,
    wrap: (value: string) => value,
  }
  const returns = {} as Record<FieldWalkerOptions, string | undefined>

  Object.keys(props).forEach((ea) => {
    const walkerKey = ea as FieldWalkerOptions
    if (props[walkerKey]) {
      returns[walkerKey] = opts[walkerKey](props[walkerKey])
    }
  })
  return returns
}

export const forCustom = {
  check: (field: Field) => field.custom && field.custom.layout,
  action: (field: Field, _hasSidebar: boolean) => {
    const thisField = field as Field & {
      custom: FieldCustomLayout
    }
    const props = thisField.custom.layout
    const values = getValues(thisField.custom.layout)
    if (typeof values.wrap == 'undefined') {
      values.wrap = 'wrap'
    }

    const set = (key: FieldWalkerOptions) => {
      return `field-layout__${values[key]}`
    }
    thisField.admin = {
      ...thisField.admin,
      className: [
        `field-layout`,
        props.direction && set('direction'),
        set('wrap'),
        props.labelSize && set('labelSize'),
        thisField.admin && 'className' in thisField.admin ? thisField.admin.className : '',
      ].join(' '),
    }

    return thisField
  },
}
