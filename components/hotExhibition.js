import React, { Component } from 'react'
class HotExhibition extends Component {
  componentDidMount () {
    (function (w, d, s, g, js, fs) {
      g = w.gapi || (w.gapi = {}); g.analytics = { q: [], ready: function (f) { this.q.push(f) } }
      js = d.createElement(s); fs = d.getElementsByTagName(s)[0]
      js.src = 'https://apis.google.com/js/platform.js'
      fs.parentNode.insertBefore(js, fs); js.onload = function () { g.load('analytics') }
    }(window, document, 'script'))
    gapi.analytics.ready(function () {
      gapi.analytics.auth.authorize({
        container: 'embed-api-auth-container',
        clientid: '938288037510-ot0p2ngpm7b0qsrm2cc1ovk0khj2h1nq.apps.googleusercontent.com'
      })

      var mainChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          dimensions: 'ga:eventCategory',
          metrics: 'ga:eventValue',
          'start-date': '2019-11-01',
          'end-date': '2020-01-05',
          filters: 'ga:eventCategory==test,ga:eventCategory==Comus'
        },
        chart: {
          type: 'TABLE',
          container: 'main-chart-container',
          options: {
            width: '100%'
          }
        }
      })
      var options = { query: { ids: 'ga:206321392' } }
      mainChart.set(options).execute()
    })
  }

  render () {
    return (
      <div>
        <section id='embed-api-auth-container' />
        <section id='main-chart-container' />
      </div>
    )
  }
}
export default HotExhibition
