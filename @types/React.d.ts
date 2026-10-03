import type React from 'react'

declare global {
  type RefObject<T> = React.RefObject<T>
  type ReactNode = React.ReactNode

  interface EMouse<
    Target extends EventTarget = Element,
    NativeEv = MouseEvent,
  > extends React.MouseEvent<Target, NativeEv> {
    currentTarget: Target
  }

  type StringUnion<S extends string> = {
    [Key in S]: Key
  }[S]

  type Keys<O extends Record<string, unknown>> = keyof O

  interface CSSProperties {
    textssss: HTMLInputElement
  }
}
