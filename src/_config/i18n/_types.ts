import type { translations } from '@/_config/i18n/_lib/translations'
import type { _areas, _grp } from '@/_config/i18n/FIELDS'
import type {
  DefaultTranslationsObject,
  I18nClient,
  NestedKeysStripped,
  TFunction,
} from '@payloadcms/translations'
import type { LabelFunction } from 'payload'

export type Area = (typeof _areas)[number]

type SingularItemKey<A extends Area> = (typeof _grp)[A][number]
type ItemKey<A extends Area> = SingularItemKey<A>

export type Entry<A extends Area> = Partial<Record<ItemKey<A>, string>>

export type Lang = {
  [Key in Area]: Partial<Record<ItemKey<Key>, Item>>
}

type Item = {
  entry: string
  plural?: string
}

export type NewTranslationObj = (typeof translations)['en']

export type NewTranslationKeys = NestedKeysStripped<NewTranslationObj & DefaultTranslationsObject>

export type TFN = (val: Valid<NewTranslationKeys>, asTitle?: boolean) => LabelFunction
export type TFNClient = (
  t: {
    i18n: I18nClient
    t: TFunction<NewTranslationKeys>
  },
  val: Valid<NewTranslationKeys>,
  asTitle?: boolean
) => string
