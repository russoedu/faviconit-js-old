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
app.use(i18n.init)

i18n.configure({
  locales: config.languages.list,
  directory: path.join(__dirname, 'locales')
})

/**
 * ROUTES
 */
app.get('/:lang', (req, res) => {
  const loc = config.setLocale(req, res, i18n, app)
  if (loc) {
    Home.render(res)
  }
})

app.get('/:lang/generate', (req, res) => {
  if (config.setLocale(req, res, i18n, app, 'generate')) {
    Generate.render(res)
  }
})

/**
 * ERROR HANDLER
 */
app.use('/:lang/*', (req, res, next) => {
  let path = req.url.split('/')
  path = path[path.length - 1]
  if (config.setLocale(req, res, i18n, app, path)) {
    next(createError(404))
  }
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
