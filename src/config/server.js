const env = require('dotenv').config()

const server = {
  port: parseInt(process.env.FAVICONIT_PORT || '3000', 10),
  url: process.env.FAVICONIT_URL || 'http://faviconit.com',
  cookie: 'faviconit'
}

module.exports = server
