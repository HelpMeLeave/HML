import type * as twColors from 'tailwindcss/colors'
import type * as twTheme from 'tailwindcss/defaultTheme'

declare module 'TW' {
  type DefaultTheme = (typeof twTheme)['default']
  type DefaultColorObj = (typeof twColors)['default']
}
