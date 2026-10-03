import { BlackPower } from '@/components/Flag/BlackPower'
import { PrideFlag } from '@/components/Flag/PrideFlag'
import { TransFlag } from '@/components/Flag/TransFlag'
import { UNFlag } from '@/components/Flag/UN'
import type { LucideIcon } from 'lucide-react'
import { icons as luIcons } from 'lucide-react'

const isFlagIcon = (entry: unknown): entry is Flag =>
  ['un', 'pride', 'trans', 'blm'].includes(String(entry))

type Flag = 'un' | 'pride' | 'trans' | 'blm'

const FlagEl = ({
  icon,
  size,
  style,
  ...props
}: {
  icon?: string | null
  size: number
  style?: Props['style']
} & Props) => {
  return (
    icon == 'un' ?
      <UNFlag.Icon
        {...props}
        style={{ color: '#498DD5', minWidth: `${size}px`, height: 'auto', ...style }}
      />
    : icon == 'pride' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...style }}>
        <PrideFlag.Icon />
      </span>
    : icon == 'trans' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...style }}>
        <TransFlag.Icon />
      </span>
    : icon == 'blm' ?
      <span
        {...props}
        style={{ width: size, height: 'auto', ...style }}>
        <BlackPower.Icon />
      </span>
    : <></>
  )
}

const CompIcon = ({
  icon,
  searchFn,
  size = 16,
  style,
}: {
  style?: Props['style']
  icon: string
  searchFn?: (icon: string) => LucideIcon | undefined
  size?: number
}) => {
  let Comp: LucideIcon | undefined

  if (!searchFn) {
    Comp = (luIcons as unknown as Record<string, LucideIcon>)[icon]
  } else {
    Comp = searchFn(icon)
  }

  return Comp ?
      <Comp
        size={size}
        strokeWidth={2}
        style={style}
      />
    : <span style={{ fontSize: '0.65rem', opacity: 0.5, ...style }}>{icon}</span>
}

export const Icon = ({
  icon,
  searchFn,
  size = 16,
  style,
  ...props
}: Props & {
  icon: string
  searchFn?: (icon: string) => LucideIcon | undefined
  size?: number
  style?: Props['style']
}) => {
  if (!icon) return null

  if (isFlagIcon(icon)) {
    return {
      icon: (
        <FlagEl
          {...props}
          icon={icon}
          size={size}
          style={style}
        />
      ),
      label: icon,
    }
  }

  return {
    icon: (
      <CompIcon
        {...props}
        searchFn={searchFn}
        size={size}
        icon={icon}
        style={style}
      />
    ),
    label: icon,
  }
}
