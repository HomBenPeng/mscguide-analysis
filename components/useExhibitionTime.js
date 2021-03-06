import React, { Component } from 'react'
class UseProductTime extends Component {
  componentWillMount () {
    this.startDate = this.props.startDate
    this.endDate = this.props.endDate
    this.exhibitionId = this.props.exhibitionId || ''
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

      var dataChart1 = new gapi.analytics.googleCharts.DataChart({
        query: {
          ids: 'ga:206321392',
          metrics: 'ga:eventValue',
          dimensions: 'ga:date',
          'start-date': this.startDate,
          'end-date': this.endDate,
          filters: 'ga:eventCategory==useExhibition_' + this.exhibitionId
        },
        chart: {
          container: 'chart-container1',
          type: 'LINE',
          options: {
            width: '100%'
          }
        }
      })
      dataChart1.execute()
    })
  }

  render () {
    return (
      <div>
        <section id='embed-api-auth-container' />
        <h1>展廳</h1>
        <section id='chart-container1' />
        <hr />
      </div>
    )
  }
}
export default UseProductTime
