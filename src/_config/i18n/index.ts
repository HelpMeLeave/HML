import { translations } from '@/_config/i18n/_lib/translations'
import { type Area, type NewTranslationKeys, type TFN, type TFNClient } from '@/_config/i18n/_types'
import { toTitleCase } from '@/lib/textCasing'
import type { TFunction } from '@payloadcms/translations'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import type { LabelFunction } from 'payload'

export const tFn: TFN =
  (val, asTitle): LabelFunction =>
  ({ t }) => {
    const transformer = (t as TFunction<NewTranslationKeys>)(val)

    const isSentenceCase = () => {
      const category = val.split(':')[0] as Area
      return Boolean(asTitle) || ['title', 'label', 'pillar'].includes(category)
    }

    return isSentenceCase() ? toTitleCase(transformer) : transformer
  }

export const tFnClient: TFNClient = (t, val, asTitle) => tFn(val, asTitle)(t)

export const i18n = {
  supportedLanguages: {
    en,
    es,
  },
  translations,
}
