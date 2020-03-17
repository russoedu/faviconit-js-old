const __ = require('i18n').__

class Home {
  static render (req, res) {
    res.render('home', {
      page: '',
      headMeta: __('home.meta')
    })
  }
}

module.exports = Home
