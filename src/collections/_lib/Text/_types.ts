import type { NewTranslationKeys } from '@/_config/i18n/_types'
import type { Condition, TextField } from 'payload'
import type { FieldAdmin } from 'payload-types'

type BaseField = Partial<Omit<TextField, 'type'>>

export type TextFieldProps = BaseField & {
  tLabel?: NewTranslationKeys
  textType?: 'mail' | 'abbreviation'
  description?: FieldAdmin['description']
  condition?: Condition
  readOnly?: boolean
}

export type ValidField = TextField & {
  admin: Valid<TextField['admin']> & {
    components: Valid<Valid<TextField['admin']>['components']>
  }
}
