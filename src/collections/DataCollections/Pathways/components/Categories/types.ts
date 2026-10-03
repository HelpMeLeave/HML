import type { SelectInputProps as PayloadSelectInputProps } from '@payloadcms/ui/fields/Select'

export type QryDoc = {
  id: number
  title: string
  path: string
}

type SelectKeys = Valid<
  {
    [Key in keyof PayloadSelectInputProps]: Key
  }[keyof PayloadSelectInputProps]
>
type SelectProp<K extends SelectKeys> = Valid<PayloadSelectInputProps[K]>

type SelectPropsOnChangeOption = Extract<
  Parameters<SelectProp<'onChange'>>[number],
  { value: unknown }
>

export type Option = Omit<SelectPropsOnChangeOption, 'value'> & Pick<Doc, 'label' | 'value'>

export type Docs = Record<string, Doc>

export type Doc = {
  id: number
  title: string
  label: string
  path: string
  includedPaths: string[]
  level: number
  value: string
}
