import type { Field } from 'payload'

export type BaseFieldProps<F extends Field> = Partial<Omit<F, 'type' | 'name'>>

export type BaseValidField<F extends Field> = F & {
  admin: Valid<F['admin']> & {
    components: Valid<Valid<F['admin']>['components']>
  }
}
