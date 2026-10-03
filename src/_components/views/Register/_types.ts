import type { FormItemType } from '@/_components/views/Register/_lib'
import type { User } from '@/payload-types'
import type { ActionDispatch } from 'react'
import type { $ZodErrorTree } from 'zod/v4/core'

export type FormProps = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'discordHandle' | 'name' | 'pronouns' | 'username'
>

export type FormEntry = {
  data: FormEntryData
  errors: FormEntryErrors
}

export type FormEntryData = {
  token: string
  username: string
  email: string
  password: {
    newPassword: string
    confirmPassword: string
  }
  firstName?: string | null
  lastName?: string | null
  name: string | null
  pronouns?: string[] | null
  discordHandle?: string | null
  signature: string
  date: string
}

type FormEntryErrors = FormItemErrors['properties']
type FormItemErrors = $ZodErrorTree<FormItemType>

export type Field = keyof FormEntry['data']
export type FormAction<F extends Field> = {
  field: F
  value: FormEntry['data'][F]
}

export type DispatchFn = ActionDispatch<[action: FormAction<Field>]>
