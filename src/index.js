#!/usr/bin/env node

const debug = require('debug')('faviconit:index')
const App = require('./app.js')
const http = require('http')

const app = new App()
/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'))
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
 */
function onListening () {
  debug(`Listening on port ${app.get('port')}`)
}
