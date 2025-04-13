import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import common from '../src/locales/common'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                common: common.es,
            },
            en: {
                common: common.en,
            },
        },
        lng: localStorage.getItem("language") || "es",
        fallbackLng: "es",
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
  })

export default i18n
