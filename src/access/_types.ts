import type { PillarNames } from '@/lib/constants/PILLARS'
import type { TIER, TIER_TITLE } from '@/lib/constants/ROLE_TIERS'
import type { User } from '@/payload-types'
import type { PayloadRequest } from 'payload'

export type IsFnProps = {
  pillar?: PillarNames
  tier?: TIER | TIER_TITLE
  team?: string
}

type StrippedArgsBase = {
  Usr: { user: User | null }
  UrlArgs: { url?: string }
}
type StrippedArgs<K extends Keys<StrippedArgsBase>> =
  K extends Keys<StrippedArgsBase> ?
    Prettify<{ req: Partial<PayloadRequest> } & { req: StrippedArgsBase[K] }>
  : never
type UrlArgs = StrippedArgs<'UrlArgs'>
type UserIsFlags = {
  [Key in keyof Required<User>]: Key extends `is${infer J}` ? `is${J}` : never
}[keyof User]

export type UsrArgs = StrippedArgs<'Usr'>
type ValidUrl = {
  req: Partial<PayloadRequest> & {
    url: string
  }
}
export type UrlOrArgs = string | UrlArgs | ValidUrl
export type UserFn = (user: null | Partial<Record<UserIsFlags, boolean | null>>) => boolean
