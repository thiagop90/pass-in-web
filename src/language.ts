import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { en, pt } from './languages'

export const resources = {
  en: { translation: en },
  pt: { translation: pt },
} as const

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
})

export default i18n
