const Config = require('../config/config')
const config = new Config()

class Home {
  static render (req, res) {
    res.render('home', { title: 'Faviconit' })
  }
}

module.exports = Home
