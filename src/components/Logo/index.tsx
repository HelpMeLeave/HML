import { SocialIcon } from '@/components/Icon/Social'
import { isMark, markHasWrapper } from '@/components/Logo/_lib'
import type { LogoVariants } from '@/components/Logo/_types'
import { LogoHorizontal } from '@/components/Logo/Horitzontal'
import { LogoMark, LogoMarkFilled } from '@/components/Logo/Mark'
import { LogoVertical, LogoWideVertical } from '@/components/Logo/Vertical'

export const Logo = (props: LogoVariants & Props<'svg'>) => {
  if (isMark(props) && markHasWrapper(props)) {
    const { logoType: _logoType, ...markProps } = props

    return <LogoMark {...markProps} />
  }

  const { logoType, ...otherProps } = props
  return (
    logoType == 'horizontal' ? <LogoHorizontal {...otherProps} />
    : logoType == 'vertical-wide' ? <LogoWideVertical {...otherProps} />
    : logoType == 'vertical' ? <LogoVertical {...otherProps} />
    : logoType == 'social' ? <SocialIcon {...otherProps} />
    : <LogoMarkFilled {...otherProps} />
  )
}
