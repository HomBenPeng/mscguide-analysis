import React, { Component } from 'react'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'

class GAChart extends Component {
    state = {
      ids: 'ga:206321392',
      mounted: false
    }

    componentDidMount () {
      ;(function (w, d, s, g, js, fjs) {
        g = w.gapi || (w.gapi = {})
        g.analytics = {
          q: [],
          ready: function (cb) {
            this.q.push(cb)
          }
        }
        js = d.createElement(s)
        fjs = d.getElementsByTagName(s)[0]
        js.src = 'https://apis.google.com/js/platform.js'
        fjs.parentNode.insertBefore(js, fjs)
        js.onload = function () {
          g.load('analytics')
        }
      })(window, document, 'script')

      this.setState({
        mounted: true
      })
    }

    render () {
      const views = {
        query: {
          ids: this.state.ids
        }
      }
      const CHARTS = [
        {
          reportType: 'ga',
          query: {
            dimensions: 'ga:date',
            metrics: 'ga:eventValue',
            'start-date': this.props.startDate,
            'end-date': this.props.endDate,
            filters: 'ga:eventCategory==Comus'
          },
          chart: {
            type: 'LINE',
            options: {
              title: 'Last 10 days sessions',
              width: '100%'
            }
          }
        }
      ]
      return (
        <div>
          {this.state.mounted && (
            <GoogleProvider accessToken='ya29.Il-3Bw-xrOQ-Rld0vuxrW_BOPrwKGK7n25IWn-TQPkHAL57TTIDS1tvbLAervsvhPz4SX_64KvjK3rD3yRNKYYN9qH4E2CuYpt_boDX8RQbyBD1YfGpzxEuHN_mFy4I64Q'>
              {CHARTS.map((c, i) => <GoogleDataChart style={{ display: 'inline-block', width: 350, margin: 20, border: '1px solid #eee', padding: 10 }} key={i} views={views} config={c} />)}
            </GoogleProvider>
          )}
        </div>
      )
    }
}
export default GAChart
