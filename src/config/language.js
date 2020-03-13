const path = require('path')

const defaultLocale = 'en'
const languageList = {
  // Social languages from https://developers.facebook.com/docs/plugins/like-button/#
  ar: { key: 'ar', name: 'Arabic', script: 'Arabic', dir: 'rtl', native: 'العربية', social: 'ar_AR' },
  ca: { key: 'ca', name: 'Catalan', script: 'Latin', dir: 'ltr', native: 'Català', social: 'ca_ES' },
  de: { key: 'de', name: 'German', script: 'Latin', dir: 'ltr', native: 'Deutsch', social: 'de_DE' },
  el: { key: 'el', name: 'Greek, Modern', script: 'Greek', dir: 'ltr', native: 'ελληνικά', social: 'el_GR' },
  es: { key: 'es', name: 'Spanish', script: 'Latin', dir: 'ltr', native: 'Español', social: 'es_LA' },
  en: { key: 'en', name: 'English', script: 'Latin', dir: 'ltr', native: 'English', social: 'en_US' },
  fi: { key: 'fi', name: 'Finnish', script: 'Latin', dir: 'ltr', native: 'Suomi', social: 'fi_FI' },
  fr: { key: 'fr', name: 'French', script: 'Latin', dir: 'ltr', native: 'Français', social: 'fr_FR' },
  it: { key: 'it', name: 'Italian', script: 'Latin', dir: 'ltr', native: 'Italiano', social: 'it_IT' },
  nl: { key: 'nl', name: 'Dutch', script: 'Latin', dir: 'ltr', native: 'Nederlands', social: 'nl_NL' },
  pl: { key: 'pl', name: 'Polish', script: 'Latin', dir: 'ltr', native: 'Język polski', social: 'pl_PL' },
  pt: { key: 'pt', name: 'Portuguese', script: 'Latin', dir: 'ltr', native: 'Português', social: 'pt_BR' },
  ro: { key: 'ro', name: 'Romanian', script: 'Latin', dir: 'ltr', native: 'Limba română', social: 'ro_RO' },
  ru: { key: 'ru', name: 'Russian', script: 'Cyrillic', dir: 'ltr', native: 'русский язык', social: 'ru_RU' },
  sk: { key: 'sk', name: 'Slovak', script: 'Latin', dir: 'ltr', native: 'Slovenčina', social: 'sk_SK' },
  sv: { key: 'sv', name: 'Swedish', script: 'Latin', dir: 'ltr', native: 'Svenska', social: 'sv_SE' },
  zh: { key: 'zh', name: 'Chinese', script: 'Chinese', dir: 'ltr', native: '中文（简体）', social: 'zh_CN' }
}

const language = {
  default: defaultLocale,
  list: languageList,
  i18nConfig: {
    locales: Object.keys(languageList),
    default: defaultLocale,
    queryParameter: 'lang',
    autoReload: true,
    syncFiles: true,
    objectNotation: true,
    api: {
      __: '__',
      __n: '__n'
    },
    directory: path.join(__dirname, '../locales')
  }
}

module.exports = language
