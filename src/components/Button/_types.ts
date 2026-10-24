import type { ButtonVariants } from '@/components/Button/className'
import type { BoxIcon, BoxIconProProps } from '@boxicons-pro/react'
import type { ComponentPropsWithRef, JSX } from 'react'

export type tBtnProps<T extends 'button' | 'link' = 'button'> = Omit<
  ButtonVariants,
  'iconOnly' | 'iconPosition'
> & {
  variant?: 'primary' | 'secondary' | 'muted' | 'ghost' | 'accent' | 'accentMuted'
  as?: T
  rounded?: boolean | number
  iconAttributes?: BoxIconProProps & {
    iconPosition?: 'left' | 'right'
    iconOnly?: boolean
  }
  Icon?: BoxIcon
  iconOnly?: boolean
} & tBtnAsProps<T>

export type tBtnAsProps<T extends 'button' | 'link'> =
  T extends 'link' ? { href: string } & Omit<Props.Link, 'as' | 'size'>
  : ComponentPropsWithRef<'button'>

export type tBtnComponent = <T extends 'button' | 'link'>(props: tBtnProps<T>) => JSX.Element
