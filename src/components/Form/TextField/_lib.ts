import type { TextFieldProps } from '@/components/Form/TextField/_types'
import { isValidElement } from 'react'

export const processFieldName = (name?: string, id?: string) =>
  (id ?? name)?.startsWith('field-') ? (id ?? name) : `field-${id ?? name}`

export const getLabelType = (Label: TextFieldProps['Label']) =>
  isValidElement(Label) ? 'react-element'
  : typeof Label == 'string' ? 'string'
  : 'object'
