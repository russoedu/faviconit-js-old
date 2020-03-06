const debug = require('debug')('faviconit:Config')
const fs = require('fs')

let instance = null

/**
 * Singleton config class
 */
class Config {
  /**
   * Construct and return the configurations from the config files
   * @returns {Config} Config singleton
   */
  constructor () {
    if (instance !== null) {
      return instance
    }
    const files = fs.readdirSync('./src/config')
    files.forEach(file => {
      if (file !== 'config.js') {
        const name = file.split('.')[0]
        this[name] = require(`./${name}`)

        debug(`Config ${name} loaded`)
      }
    })

    instance = this
    return instance
  }
}

module.exports = Config
