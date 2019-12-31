const express = require('express')
const app = express()
const Insight = require('insight')
const pkg = require('../package.json')
const insight = new Insight({
  // Google Analytics tracking code
  trackingCode: 'UA-152710294-1',
  pkg
})

app.get(['/api/setHotExhibition/*', '/api/setHotExhibition'], function (req, res) {
  var { exhibition } = req.query
  insight.trackEvent({
    category: exhibition,
    action: 'mscguideAPI',
    value: 1
  })
  res.send('ok')
})

module.exports = app
