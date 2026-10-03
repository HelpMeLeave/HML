'use client'

import { cn } from '@/lib/cn'
import { ButtonContents } from '@payloadcms/ui/elements/Button'
import Link from 'next/link'
import type React from 'react'

type ButtonProps = Props<typeof Link> & {
  buttonId?: string
  buttonStyle?:
    | 'dashed'
    | 'error'
    | 'icon-label'
    | 'none'
    | 'pill'
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'tab'
    | 'transparent'
  icon?: ['chevron' | 'edit' | 'plus' | 'x'] | React.ReactNode
  iconPosition?: 'left' | 'right'
  iconStyle?: 'none' | 'with-border' | 'without-border'
  margin?: boolean
  newTab?: boolean
  round?: boolean
  size?: 'large' | 'medium' | 'small' | 'xsmall'
  tooltip?: string
  disabled?: boolean
}

export const BtnAsLink = ({
  icon,
  iconStyle,
  iconPosition,
  size,
  margin,
  buttonStyle,
  href,
  newTab,
  ...props
}: ButtonProps) => {
  return (
    <Link
      href={href}
      prefetch={false}
      type='button'
      {...props}
      className={cn(
        `btn doc-tab`,
        `btn--style-${buttonStyle ?? 'primary'}`,
        `btn--size-${size ?? 'medium'}`,
        `btn--icon-style-${iconStyle ?? 'without-border'}`,
        margin == false && `btn--no-margin`,
        iconPosition && `btn--icon-position-${iconPosition}`,
        icon && `btn-icon btn--has-icon`,
        props.className
      )}
      target={newTab ? '_blank' : '_self'}
      aria-disabled={Boolean(props.disabled)}>
      <ButtonContents
        showTooltip={false}
        tooltip={undefined}
        icon={icon}>
        {props.children}
      </ButtonContents>
    </Link>
  )
}
