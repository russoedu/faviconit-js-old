const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const Config = require('../config/config')
const config = new Config()

/**
 * Express helper class
 */
class ExpressHelper {
  /**
   * Set the Express app
   * @param {Express} app The Express app object
   */
  constructor (app) {
    this.app = app
  }

  /**
   * Setup express app
   * @private
   */
  setup () {
    this.app.set('port', config.server.port)
    this.app.set('views', path.join(__dirname, '../views'))
    this.app.set('view engine', 'pug')
    this.app.use(logger('dev'))
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(__dirname, '../../public')))
  }
}

module.exports = ExpressHelper
