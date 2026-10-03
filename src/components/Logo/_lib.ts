import type { LogoVariants, MarkLogoVariants, MarkText } from '@/components/Logo/_types'

export const markHasWrapper = (entry: MarkLogoVariants): entry is MarkText => entry.mark != 'filled'

export const isMark = (entry: LogoVariants): entry is MarkLogoVariants => entry.logoType == 'mark'
