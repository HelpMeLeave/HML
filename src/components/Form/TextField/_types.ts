import type { LucideIcon } from 'lucide-react'

export type TextFieldProps = Omit<
  Props.WithRef<'input'>,
  'checked' | 'defaultChecked' | 'defaultValue'
> & {
  Label: TextFieldIcon
  error?: string | string[]
  Icon?: LucideIcon
  defaultValue?: Nullish<string | number | readonly string[]>
}

type TextFieldIcon =
  | ReactNode
  | (Omit<Props<'label'>, 'children'> & {
      value: string
      required?: boolean
    })
