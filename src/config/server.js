const env = require('dotenv').config()

const server = {
  port: parseInt(process.env.FAVICONIT_PORT || '3000', 10),
  cookie: 'faviconit'
}

module.exports = server
