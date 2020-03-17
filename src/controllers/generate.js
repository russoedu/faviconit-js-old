const __ = require('i18n').__

class Generate {
  static render (req, res) {
    res.render('generate', {
      page: 'generate',
      headMeta: __('download.meta')
    })
  }
}

module.exports = Generate
