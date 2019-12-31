const express = require('express')
const app = express()
const Insight = require('insight')
const pkg = require('../package.json')
const insight = new Insight({
  // Google Analytics tracking code
  trackingCode: 'UA-152710294-1',
  pkg
})

app.get(['/api/setHotPeoduct/*', '/api/setHotPeoduct'], function (req, res) {
  var { product } = req.query
  insight.trackEvent({
    category: product,
    action: 'mscguideAPI',
    value: 1
  })
  res.send('ok')
})

module.exports = app
