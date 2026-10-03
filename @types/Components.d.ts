import type { IconName } from 'lucide-react/dynamic'
import type { Route } from 'next'

declare global {
  type Props<T extends React.ElementType = 'div'> = React.ComponentPropsWithoutRef<T>

  namespace Props {
    type Icon = Props<'svg'> & {
      solid?: boolean
      IconName?: IconName
    }

    type IconPath = Omit<Icon, 'IconName'>
    type Link = Omit<Props<typeof import('next/link').default>, 'href'> & {
      size?: 'sm' | 'md' | 'lg'
      href: Route
    }

    type Heading = Props<'h1'> & {
      level?: 1 | 2 | 3 | 4 | 5 | 6
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'title'
    }
    type WithRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>
  }

  type AnySafe = any
  type AnyObject = Record<string, AnySafe>
  type Sub<T, Target extends keyof T, NewType = Record<T, unknown>> = Omit<T, Target> & NewType

  type Slug<V> = {
    params: Promise<V>
  }

  type Valid<T> = Exclude<T, null | undefined>
  type Override<Type, NewType> = Omit<Type, keyof NewType> & NewType
  type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
  type ToDo = AnySafe

  type Prettify<T> = {
    [K in keyof T]: T[K]
  } & {}
}

export {}
