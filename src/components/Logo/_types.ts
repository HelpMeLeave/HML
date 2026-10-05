import type { TextColors } from 'TW'

export type MarkText = {
  logoType: 'mark'
  mark: 'uppercase' | 'lowercase' | 'text-only'
  textBackground?: TextColors
  wrapperProps?: Props<'span'>
}
type MarkFilled = {
  logoType: 'mark'
  mark: 'filled'
}
export type MarkLogoVariants = MarkFilled | MarkText

type TextLogoVariants = {
  logoType: 'vertical' | 'horizontal' | 'vertical-wide'
}
type SocialLogoVariant = {
  logoType: 'social'
}
export type LogoVariants = MarkLogoVariants | TextLogoVariants | SocialLogoVariant
