import type { tBtnComponent, tBtnProps } from '@/components/Button/_types'
import { btnClassName, type ButtonVariants } from '@/components/Button/className'
import { TouchTarget } from '@/components/Button/TouchTarget'
import { cn } from '@/lib/cn'
import { objHasKey } from '@/lib/objHasKey'
import Link from 'next/link'
import type { ElementType } from 'react'
import { twJoin } from 'tailwind-merge'

export const Button: tBtnComponent = (props) => {
  const {
    size = 'medium',
    btnStyle = 'primary',
    rounded = false,
    iconAttributes,
    Icon,
    as,
    className,
    iconOnly,
    ...rest
  } = props

  const El = 'href' in props || as == 'link' ? Link : ('button' as ElementType)

  const btnProps = {
    size,
    // btnStyle: btnStyle ?? variant,
    btnStyle,
    rounded,
    className,
  } as ButtonVariants

  if (Boolean(Icon)) {
    btnProps.hasIcon = true

    if (iconOnly) btnProps.iconOnly = iconOnly
    else btnProps.iconPosition = iconAttributes?.iconPosition ?? 'left'
  }

  if (!objHasKey('href', props) && as != 'link') rest.type = 'button'

  return (
    <El
      {...rest}
      className={cn(btnClassName(btnProps))}>
      <TouchTarget as={as ?? 'button'}>
        <Inner
          size={size}
          iconOnly={iconOnly}
          iconAttributes={iconAttributes}
          Icon={Icon}>
          {props.children}
        </Inner>
      </TouchTarget>
    </El>
  )
}

const Inner = ({ iconAttributes, Icon: Icon, size, iconOnly, ...props }: tBtnProps) => {
  // const { iconPosition, iconOnly, size: iconSize, ...rest } = iconAttributes ?? {}
  const { iconPosition = 'left', size: iconSize, ...rest } = iconAttributes ?? {}

  return (
    <>
      {Icon && (
        <span
          data-slot='icon'
          data-icon-position={iconPosition}
          className={twJoin(
            'btn__icon flex items-center',
            iconOnly ? 'justify-center' : 'w-min',
            !iconOnly && (iconPosition == 'left' ? 'col-start-1' : 'col-start-2')
          )}>
          <Icon
            width={!iconSize && size == 'small' ? 14 : undefined}
            height={!iconSize && size == 'small' ? 14 : undefined}
            size={
              iconSize
              ?? (size == 'small' ? undefined
              : size == 'medium' ? 'xs'
              : 'sm')
            }
            {...rest}
            className={cn('transition-all', rest.className)}
          />
        </span>
      )}
      {!iconOnly && (
        <span className={twJoin('btn__label block w-full min-w-max')}>{props.children}</span>
      )}
    </>
  )
}
