#!/usr/bin/env node

const debug = require('debug')('faviconit:index')
const app = require('./app.js')
const http = require('http')
const env = require('dotenv').config()
const port = parseInt(process.env.FAVICONIT_PORT || '3000', 10)
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 * @param {error} error Server error
 * @throws {error} Server error
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  debug(`Listening on port ${port}`)
}
