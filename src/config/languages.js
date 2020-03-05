const languages = {
  default: 'en',
  list: [
    'de', // 1
    'en', // 2
    'es', // 3
    'fr', // 4
    'it', // 5
    'pl', // 6
    'ro', // 7
    'nl', // 8
    'pt', // 9
    'ru', // 10
    'fi', // 11
    'ca', // 12
    'zh', // 13
    'sv', // 14
    'sk', // 14
    'el', // 15
    'ar' // 16
  ],
  direction: function (lang) {
    return lang === 'ar' ? 'rtl' : 'ltr'
  }
}

module.exports = languages
