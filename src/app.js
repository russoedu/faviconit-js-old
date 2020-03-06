const debug = require('debug')('faviconit:app')
const path = require('path')
const logger = require('morgan')
const express = require('express')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')

const Config = require('./config/config')
const Home = require('./controllers/home')
const Generate = require('./controllers/generate')

const config = new Config()

const app = express()

// port setup
app.set('port', config.server.port)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

/**
 * i18n middleware configuration
 */
i18n.configure({
  locales: config.language.list,
  defaultLocale: config.language.default,
  queryParameter: 'lang',
  autoReload: true,
  api: {
    __: '__',
    __n: '__n'
  },
  directory: path.join(__dirname, 'locales')
})
app.use(i18n.init)

/**
 * ROUTES
 */
function langRouter (req, res, next) {
  if (config.language.list.find(element => element === req.params.lang)) {
    i18n.setLocale([req, res.locals], req.params.lang)
    res.locals.language = `/${req.params.lang}`
    app.locals.readDirection = config.language.direction(req.params.lang)
    app.locals.url = `http://faviconit.com${req.url}`
  } else {
    res.redirect(`/${config.language.default}`)
  }
  next()
}

app.all('/', (req, res) => {
  const acceptedLanguagesRegEx = /([a-z]{2})/g
  const acceptedLanguages = req.headers['accept-language'].match(acceptedLanguagesRegEx)
  debug(req.headers['accept-language'])
  debug(acceptedLanguages)
  acceptedLanguages.forEach(language => {
    const foundLang = config.language.list.find(element => element === language)
    if (typeof foundLang !== 'undefined') {
      return res.status(302).redirect(`/${foundLang}`)
    }
  })
  return res.status(302).redirect(`/${config.language.default}`)
})

app.all('/:lang/*', langRouter)
app.use('/:lang', langRouter)

app.get('/:lang', (req, res) => {
  Home.render(res)
})

app.get('/:lang/generate', (req, res) => {
  Generate.render(res)
})

/**
 * ERROR HANDLER
 */
app.use('/:lang/*', (req, res, next) => {
  next(createError(404))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  debug(`error ${err.status}: ${err}`)
  if (err.status === 404) {
    return res.status(err.status).render('404', { error: err })
  } else {
    return res.status(err.status).render('error', { error: err })
  }
})

module.exports = app
