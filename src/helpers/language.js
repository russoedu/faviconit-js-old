const debug = require('debug')('faviconit:language helper')
const Config = require('../config/config')
const config = new Config()

/**
 * Language and I18N helper class
 */
class LanguageHelper {
  /**
   *
   * @param {Express} app The Express app object
   * @param {i18n} i18n The i18n object
   */
  constructor (app, i18n) {
    this.app = app
    this.i18n = i18n
  }

  /**
   * Configure the i18n and the app
   */
  setup () {
    this.i18n.configure(config.language.i18nConfig)
    this.app.use(this.i18n.init)
  }

  /**
   * Identify the user language by comparing the accepeted languages header to the list of translations
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @returns {string} The identified language or the default
   */
  getUserLanguage (req) {
    const userAcceptedLanguagesRegEx = /([a-z]{2})/g
    const userAcceptedLanguages = req.headers['accept-language'].match(userAcceptedLanguagesRegEx)
    let lang = config.language.default

    // Iterate each user accepted languages until one matches the application languages
    for (let i = 0; i < userAcceptedLanguages.length; i++) {
      const foundLang = Object.keys(config.language.list).find(element => element === userAcceptedLanguages[i])
      // If an application lang is found, break and set lang
      if (typeof foundLang !== 'undefined') {
        lang = foundLang
        break
      }
    }
    return lang
  }

  /**
   * Thry to identify the language in the request and set in the app
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @returns {boolean} true if a language was identified, false if no language was identified
   */
  setLang (req, res) {
    if (Object.keys(config.language.list).find(element => element === req.params.lang)) {
      debug(`Identified language: ${req.params.lang}`)

      this.i18n.setLocale([req, res.locals], req.params.lang)
      this.app.locals.language = config.language.list[req.params.lang]
      this.app.locals.languagesList = config.language.list
      this.app.locals.url = config.server.url + req.originalUrl
      return true
    }
    return false
  }
}

module.exports = LanguageHelper
