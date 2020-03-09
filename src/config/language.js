const path = require('path')

const language = {
  default: 'en',
  list: {
    ar: { key: 'ar', name: 'Arabic', script: 'Arabic', dir: 'rtl', native: 'العربية' },
    ca: { key: 'ca', name: 'Catalan', script: 'Latin', dir: 'ltr', native: 'Català' },
    de: { key: 'de', name: 'German', script: 'Latin', dir: 'ltr', native: 'Deutsch' },
    el: { key: 'el', name: 'Greek, Modern', script: 'Greek', dir: 'ltr', native: 'ελληνικά' },
    es: { key: 'es', name: 'Spanish', script: 'Latin', dir: 'ltr', native: 'Español' },
    en: { key: 'en', name: 'English', script: 'Latin', dir: 'ltr', native: 'English' },
    fi: { key: 'fi', name: 'Finnish', script: 'Latin', dir: 'ltr', native: 'Suomi' },
    fr: { key: 'fr', name: 'French', script: 'Latin', dir: 'ltr', native: 'Français' },
    it: { key: 'it', name: 'Italian', script: 'Latin', dir: 'ltr', native: 'Italiano' },
    nl: { key: 'nl', name: 'Dutch', script: 'Latin', dir: 'ltr', native: 'Nederlands' },
    pl: { key: 'pl', name: 'Polish', script: 'Latin', dir: 'ltr', native: 'Język polski' },
    pt: { key: 'pt', name: 'Portuguese', script: 'Latin', dir: 'ltr', native: 'Português' },
    ro: { key: 'ro', name: 'Romanian', script: 'Latin', dir: 'ltr', native: 'Limba română' },
    ru: { key: 'ru', name: 'Russian', script: 'Cyrillic', dir: 'ltr', native: 'русский язык' },
    sk: { key: 'sk', name: 'Slovak', script: 'Latin', dir: 'ltr', native: 'Slovenčina' },
    sv: { key: 'sv', name: 'Swedish', script: 'Latin', dir: 'ltr', native: 'Svenska' },
    zh: { key: 'zh', name: 'Chinese', script: 'Chinese', dir: 'ltr', native: '中文（简体）' }
  },
  i18nConfig: {
    locales: this.list,
    defaultLocale: this.default,
    queryParameter: 'lang',
    autoReload: true,
    api: {
      __: '__',
      __n: '__n'
    },
    directory: path.join(__dirname, '../locales')
  }
}

module.exports = language
