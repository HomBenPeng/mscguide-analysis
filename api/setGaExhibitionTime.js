const express = require('express')
const app = express()
const Insight = require('insight')
const pkg = require('../package.json')
const insight = new Insight({
  // Google Analytics tracking code
  trackingCode: 'UA-152710294-1',
  pkg
})

app.get(['/api/setGaExhibitionTime/*/*', '/api/setGaExhibitionTime'], function (req, res) {
  var { exhibition, time } = req.query
  insight.trackEvent({
    category: exhibition,
    action: 'mscguideAPI',
    value: time
  })
  res.send('ok')
})

module.exports = app
