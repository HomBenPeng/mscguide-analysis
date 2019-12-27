import React, { useEffect, useState } from 'react'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'

const GAChart = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
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
    setMounted(true)
  })

  const views = {
    query: {
      ids: 'ga:206321392'
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
      {mounted && (
        <GoogleProvider accessToken='ya29.Il-3BwJL13z3LfWCpolNCdGVWcxm_SIDFo6XR41vVOC7ZggUpaBzoxtc-zFRqvFNnr43OmFjCNCXbnuk-UankELscjJgrOQPXssjwC3h_9uUYWGg8B1bsOci7zVGGtIB6w'>
          {CHARTS.map((c, i) => <GoogleDataChart style={{ display: 'inline-block', width: 350, margin: 20, border: '1px solid #eee', padding: 10 }} key={i} views={views} config={c} />)}
        </GoogleProvider>
      )}
    </div>
  )
}
export default GAChart
