export type InputType = StringUnion<InputDateType | TextType | NumberType>

export type InputDateType = 'date' | 'datetime-local' | 'month' | 'time' | 'week'
export type TextType = 'search' | 'text' | 'url' | 'email' | 'password'
export type NumberType = 'number' | 'tel'
