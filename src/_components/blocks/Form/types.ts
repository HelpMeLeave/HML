import type { Form } from '@/payload-types'

export type labelFieldType = Nullish<string>
export type widthFieldType = number | undefined | null

export type FormField = NonNullable<Form['fields']>[number]
