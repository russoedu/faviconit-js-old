const debug = require('debug')('faviconit:app')
const express = require('express')
const i18n = require('i18n')
const createError = require('http-errors')

const app = express()

const LanguageHelper = require('./helpers/language')
const languageHelper = new LanguageHelper(app, i18n)

const ExpressHelper = require('./helpers/express')
const expressHelper = new ExpressHelper(app)

/**
 * Express app creator
 * @access public
 */
class App {
  constructor () {
    expressHelper.setup()
    languageHelper.setup()

    // Main routes
    app.get('/', App._languageRedirect)
    app.all('/:lang/*', App._langRouter)
    app.use('/:lang', App._langRouter)

    // Controllers
    const Home = require('./controllers/home')
    const Generate = require('./controllers/generate')

    app.get('/:lang', (req, res) => {
      Home.render(res, { page: '' })
    })
    app.get('/:lang/generate', (req, res) => {
      Generate.render(res, { page: 'generate' })
    })

    // Error handlers
    app.use('/*', (req, res, next) => next(createError(404)))
    app.use(App._errorResponse)

    return app
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
   * Handle language check if no language set in the URL. Redirect to the browser identified language or the default language
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @returns {*} redirect to the identified language
   */
  static _languageRedirect (req, res) {
    const lang = languageHelper.getUserLanguage(req)
    return res.status(302).redirect(`/${lang}`)
  }

  /**
   * Route the application to the corect language
   * @static
   * @private
   * @param {*} req HTTP request
   * @param {*} res HTTP response
   * @param {function(err:any, req:any, res:any, next:function)} next Express next callback function
   */
  static _langRouter (req, res, next) {
    if (languageHelper.setLang(req, res)) {
      next()
    }
    next(createError(404))
  }

  /**
   * Event listener for HTTP server "error" event.
   * @param {error} error Server error
   * @throws {error} Server error
   * @static
   */
  static onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${app.get('port')} requires elevated privileges`)
        process.exit(1)
      case 'EADDRINUSE':
        console.error(`Port ${app.get('port')} is already in use`)
        process.exit(1)
      default:
        throw error
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   * @static
   */
  static onListening () {
    debug(`Listening on port ${app.get('port')}`)
  }
}

module.exports = App
