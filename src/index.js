#!/usr/bin/env node

const App = require('./app.js')
const http = require('http')

const app = new App()
const server = http.createServer(app)

server.listen(app.get('port'))
server.on('error', App.onError)
server.on('listening', App.onListening)
