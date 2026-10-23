import { BoxIconProProps } from '@boxicons-pro/react'

declare module '@boxicons-pro/react' {
  type BoxIcon = React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
      & React.RefAttributes<SVGSVGElement>
      & BoxIconProProps
  >
}

export {}
