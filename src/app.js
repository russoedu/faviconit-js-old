const debug = require('debug')('faviconit:app')
const path = require('path')
const logger = require('morgan')
const express = require('express')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')

const Config = require('./config/config')
const config = new Config()
const app = express()

/**
 * Express app creator
 * @access public
 */
class App {
  constructor () {
    this.expressSetup()
    this.setMainRoutes()

    // Controllers
    const Home = require('./controllers/home')
    const Generate = require('./controllers/generate')

    app.get('/:lang', (req, res) => { Home.render(res) })
    app.get('/:lang/generate', (req, res) => { Generate.render(res) })

    this.setErrors()

    return app
  }

  /**
   * Setup express app
   */
  expressSetup () {
    i18n.configure(config.language.i18nConfig)
    app.set('port', config.server.port)
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')
    app.use(logger('dev'))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.join(__dirname, '../public')))
    app.use(i18n.init)
  }

  /**
   * Set the main, default routes
   */
  setMainRoutes () {
    app.get('/', App._acceptedLang)
    app.all('/:lang/*', App._langRouter)
    app.use('/:lang', App._langRouter)
  }

  /**
   * Set the errors
   */
  setErrors () {
    app.use('/*', App._errorHandler)
    app.use(App._errorResponse)
  }

  /**
   * Handle general errors
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @param {function(err:any, req:any, res:any, next:function)} next Express next callback function
   */
  static _errorHandler (req, res, next) {
    next(createError(404))
  }

  /**
   * Handle errors response
   * @static
   * @private
   * @param {*} err HTTP error
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @param {function(err:any, req:any, res:any, next:function)} next Express next callback function
   */
  // eslint-disable-next-line no-unused-vars
  static _errorResponse (err, req, res, next) {
    debug(`error ${err.status}: ${err}`)
    if (err.status === 404) {
      return res.status(err.status).render('404', { error: err })
    } else {
      return res.status(err.status).render('error', { error: err })
    }
  }

  /**
   * Handle language check if no language set in the URL. Redirect to the browser identified language or the default
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   */
  static _acceptedLang (req, res) {
    const acceptedLanguagesRegEx = /([a-z]{2})/g
    const acceptedLanguages = req.headers['accept-language'].match(acceptedLanguagesRegEx)
    let lang = config.language.default
    for (let i = 0; i < acceptedLanguages.length; i++) {
      const foundLang = config.language.list.find(element => element === acceptedLanguages[i])
      if (typeof foundLang !== 'undefined') {
        lang = foundLang
        break
      }
    }
    debug(`Identified language: ${lang}`)
    return res.status(302).redirect(`/${lang}`)
  }

  /**
   * Identify the language in the URL and set in the app OR redirect to an error if language is not identified
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @param {function(err:any, req:any, res:any, next:function)} next Express next callback function
   */
  static _langRouter (req, res, next) {
    debug(typeof req)
    debug(typeof res)
    debug(typeof next)
    if (config.language.list.find(element => element === req.params.lang)) {
      debug(`Identified language: ${req.params.lang}`)
      i18n.setLocale([req, res.locals], req.params.lang)
      res.locals.language = `/${req.params.lang}`
      app.locals.readDirection = config.language.direction(req.params.lang)
      app.locals.url = `http://faviconit.com${req.url}`
      next()
    } else {
      next(createError(404))
    }
  }
}

module.exports = App
