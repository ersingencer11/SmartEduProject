const User = require('../models/User')

module.exports = (req, res, next) => {
  if (req.session.UserID) {
    return res.redirect('/')
  }
  next()
}
