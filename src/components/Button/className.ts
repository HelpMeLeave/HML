import { cn } from '@/lib/cn'
import { objHasKey } from '@/lib/objHasKey'
import { cva, type VariantComponentProps, type VariantConfig } from 'class-variance-authority'

type ButtonBaseProps = {
  size?: 'small' | 'medium' | 'large' | 'x-large'
  btnStyle?: 'primary' | 'secondary' | 'muted' | 'ghost' | 'accent' | 'accentMuted'
  iconPosition?: 'left' | 'right' | '-iconOnly'
  hasIcon?: boolean
  rounded?: boolean
}

export type ButtonVariants = VariantComponentProps<ButtonBaseProps>
type CVAConfig = VariantConfig<ButtonBaseProps>

export const btnClassName = ({
  className,
  size,
  btnStyle,
  iconOnly,
  rounded,
  hasIcon,
  ...opts
}: ButtonVariants & Pick<Props<'button'>, 'className'>) => {
  const iconPosition =
    iconOnly ? 'iconOnly'
    : objHasKey('iconPosition', opts) ? (opts.iconPosition ?? 'right')
    : undefined

  const btnCva = cva<Omit<CVAConfig, 'iconPosition'>>(
    [
      'relative grid cursor-pointer items-center gap-2 text-xs leading-4 font-semibold tracking-wide whitespace-nowrap uppercase transition-all duration-300 ease-in-out focus-visible:outline-0 dark:tracking-normal',
      '*:row-start-1',
      className,
    ],
    {
      variants: {
        size: {
          small: 'px-2.5 py-1',
          medium: 'px-3.5 py-2.5',
          large: '',
          'x-large': '',
        },
        btnStyle: {
          primary: [
            'bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700',
            'dark:bg-red-700 dark:hocus:bg-red-900',
            'interactive',
            'disabled:saturate-15',
          ],
          secondary: 'bg-mulberry-800 text-white hover:bg-mulberry-600',
          ghost: 'border-0 bg-transparent text-body',
          muted: [
            'text-accent hover:bg-mulberry-700/10',
            'dark:bg-mulberry-900 dark:text-grey-50 hover:dark:bg-mulberry-700',
          ],
          accent: cn([
            'bg-red-600 text-white hover:bg-mulberry-700',
            'dark:bg-yellow-800 dark:outline-yellow-300/30 dark:hover:bg-yellow-900 dark:hover:outline-yellow-300/10',
            'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-base-300 disabled:dark:bg-base-800 disabled:dark:text-base-600',
          ]),
          accentMuted: [
            'bg-mulberry-50 text-mulberry-500 outline-mulberry-100/70 hover:text-body',
            'dark:bg-yellow-300/10 dark:text-yellow-500',
            'ring-zinc-600 hover:saturate-25 dark:outline-transparent',
            'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-base-300 disabled:dark:bg-base-800 disabled:dark:text-base-600',
          ],
        },
        hasIcon: {
          true: null,
          false: null,
        },
        rounded: {
          false: 'rounded-md',
          true: 'rounded-full',
        },
      },
      defaultVariants: {
        size: 'medium',
        btnStyle: 'primary',
        rounded: true,
        hasIcon: false,
      },
    }
  )

  const iconCVA = cva('', {
    variants: {
      iconPosition: {
        left: null,
        right: null,
        iconOnly: null,
      },
      hasIcon: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      {
        hasIcon: true,
        iconPosition: 'iconOnly',
        className: ['grid-cols-1 p-0'],
      },
      {
        hasIcon: true,
        iconPosition: 'left',
        className: 'grid-cols-[min-content] *:slot-icon:col-start-1',
      },
      {
        hasIcon: true,
        iconPosition: 'right',
        className: [
          'grid-cols-[min-content_min-content] btn-icon:col-start-2 btn-label:col-start-1 btn-label:w-full',
        ],
      },
    ],
  })

  // return cn(btnCva({ rounded, size, btnStyle }), iconCVA({ className, iconPosition, hasIcon }))
  return cn(btnCva({ rounded, size, btnStyle }), iconCVA({ iconPosition, hasIcon }))
}
