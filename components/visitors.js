import React, { Component } from 'react'
class Visitors extends Component {
  componentWillMount () {
    this.startDate = this.props.startDate
    this.endDate = this.props.endDate
  }

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
          metrics: 'ga:sessions',
          dimensions: 'ga:date',
          'start-date': this.startDate,
          'end-date': this.endDate,
          filters: 'ga:eventCategory==visitors'
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
export default Visitors
