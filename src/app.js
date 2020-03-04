const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

/**
 * ROUTES
 */
app.use('/', indexRouter)
app.use('/users', usersRouter)

/**
 * ERROR HANDLER
 */
app.use((req, res, next) => {
  next(createError(404))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(err.status).render('404', { error: err })
  } else {
    return res.status(err.status).render('error', { error: err })
  }
})

module.exports = app
