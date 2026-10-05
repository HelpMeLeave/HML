export type InputType = StringUnion<InputDateType | TextType | NumberType>

export type InputDateType = 'date' | 'datetime-local' | 'month' | 'time' | 'week'
type TextType = 'search' | 'text' | 'url' | 'email' | 'password'
type NumberType = 'number' | 'tel'
