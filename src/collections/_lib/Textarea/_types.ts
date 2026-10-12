import type { NewTranslationKeys } from '@/_config/i18n/_types'
import type { Condition, TextareaField } from 'payload'
import type { FieldAdmin } from 'payload-types'

type BaseField = Partial<Omit<TextareaField, 'type'>>

export type TextareaFieldProps = BaseField & {
  tLabel?: NewTranslationKeys
  description?: FieldAdmin['description']
  condition?: Condition
  readOnly?: boolean
  width?: string
}

export type ValidField = TextareaField & {
  admin: Valid<TextareaField['admin']> & {
    components: Valid<Valid<TextareaField['admin']>['components']>
  }
}
