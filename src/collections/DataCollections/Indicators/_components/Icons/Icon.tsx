import { QUICK_ICONS } from '@/collections/DataCollections/Indicators/_components/Icons/_lib'
import { BlackPower } from '@/components/Flag/BlackPower'
import { PrideFlag } from '@/components/Flag/PrideFlag'
import { TransFlag } from '@/components/Flag/TransFlag'
import { UNFlag } from '@/components/Flag/UN'
import type { BoxIcon, BoxIconProProps } from '@boxicons-pro/react'

const isFlagIcon = (entry: unknown): entry is Flag =>
  ['un', 'pride', 'trans', 'blm'].includes(String(entry))

type Flag = 'un' | 'pride' | 'trans' | 'blm'

const FlagEl = ({
  icon,
  size,
  cssStyle,
  ...props
}: {
  icon?: string | null
} & BoxIconProProps) => {
  return (
    icon == 'un' ?
      <UNFlag.Icon
        {...props}
        style={{ color: '#498DD5', minWidth: `${size}px`, height: 'auto', ...cssStyle }}
      />
    : icon == 'pride' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...cssStyle }}>
        <PrideFlag.Icon />
      </span>
    : icon == 'trans' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...cssStyle }}>
        <TransFlag.Icon />
      </span>
    : icon == 'blm' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...cssStyle }}>
        <BlackPower.Icon />
      </span>
    : <></>
  )
}

const CompIcon = ({
  icon,
  searchFn,
  size = 'base',
  style,
  cssStyle,
  width,
  height,
}: BoxIconProProps & {
  icon: string
  searchFn?: (icon: string) => BoxIcon | undefined
}) => {
  let Comp: BoxIcon | undefined

  if (!searchFn) {
    Comp = QUICK_ICONS.find((x) => x.id == icon)?.Comp
  } else {
    Comp = searchFn(icon)
  }

  return Comp ?
      <>
        <Comp
          data-icon={icon}
          size={size}
          width={width}
          height={height}
          strokeWidth={2}
          cssStyle={cssStyle}
          style={style}
        />
        <span className='sr-only'>{icon}</span>
      </>
    : <span style={{ fontSize: '0.65rem', opacity: 0.5, ...cssStyle }}>{icon}</span>
}

export const Icon = ({
  icon,
  searchFn,
  size = 'base',
  style,
  ...props
}: Omit<BoxIconProProps, 'size'> & {
  icon: string
  searchFn?: (icon: string) => BoxIcon | undefined
  size?: number | BoxIconProProps['size']
  style?: Props['style']
}) => {
  if (!icon) return null

  const propSize =
    typeof size == 'number' ?
      {
        width: size,
        height: size,
      }
    : { size }

  if (isFlagIcon(icon)) {
    return {
      Icon: (
        <FlagEl
          {...props}
          icon={icon}
          cssStyle={style}
          {...propSize}
        />
      ),
      label: icon,
    }
  }

  return {
    Icon: (
      <CompIcon
        {...props}
        {...propSize}
        searchFn={searchFn}
        icon={icon}
        cssStyle={style}
      />
    ),
    label: icon,
  }
}
