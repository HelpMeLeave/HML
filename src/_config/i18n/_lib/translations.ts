import { createLanguage } from '@/_config/i18n/_lib/createLanguage'
import { en } from '@/_config/i18n/languages/en'
import { es } from '@/_config/i18n/languages/es'

export const translations = {
  en: createLanguage(en),
  es: createLanguage(es),
}
