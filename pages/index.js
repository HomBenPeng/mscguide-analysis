import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import {
  Button,
  Columns,
  Box,
  Content,
  Container,
  Level,
  Form,
  Tag
} from 'react-bulma-components'
//  Joseph 引入Components
import HotProduct from '../components/hotProduct'
import HotExhibition from '../components/hotExhibition'
import UseProductTime from '../components/useProductTime'
import UseExhibitiomTime from '../components/useExhibitionTime'
import Registered from '../components/registered'
import Visitors from '../components/visitors'

//  Joseph 引入Components
const tabList = [
  {
    name: '展廳停留時間',
    icon: '',
    content: 'Stuff 1'
  }, {
    name: '展品使用時間',
    icon: '',
    content: 'Stuff 2'
  }, {
    name: '熱門展品',
    icon: '',
    content: 'Stuff 3'
  }, {
    name: '熱門展廳',
    icon: '',
    content: 'Stuff 4'
  }, {
    name: '註冊用戶',
    icon: '',
    content: 'Stuff 5'
  }, {
    name: '進展人數',
    icon: '',
    content: 'Stuff 6'
  }
]

const Tab = (props) => {
  const { name } = props.tab
  const { activeTab, changeActiveTab } = props

  return (
    <li className={name === activeTab && 'is-active'} onClick={() => changeActiveTab(name)}>
      <a>
        <span>{name}</span>
      </a>
    </li>
  )
}

class Tabs extends Component {
  render () {
    return (
      <div className='tabs is-centered is-boxed'>
        <ul>
          {tabList.map(tab =>
            <Tab
              tab={tab}
              key={tab.name}
              activeTab={this.props.activeTab}
              changeActiveTab={this.props.changeActiveTab}
            />
          )}
        </ul>
      </div>
    )
  }
}

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: '展廳停留時間',
      startDate: new Date(),
      endDate: new Date(),
      startDateStr: '',
      endDateStr: '',
      dateError: false
    }
  }

  componentDidMount = async () => {
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
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    })
  }

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    })
  }

  changeActiveTab (tab) {
    this.setState({ activeTab: tab })
  }

  onSearch = () => {
    const { startDate, endDate } = this.state
    const startTime = startDate.getTime()
    const endTime = endDate.getTime()
    if (endTime > startTime) {
      this.setState({
        startDateStr: moment(startDate).format('YYYY-MM-DD'),
        endDateStr: moment(endDate).format('YYYY-MM-DD'),
        dateError: false
      })
    } else {
      this.setState({
        dateError: true
      })
    }
  }

  renderChart = () => {
    const { activeTab, startDateStr, endDateStr } = this.state
    if (activeTab === '展廳停留時間') {
      console.log('startDateStr: ' + startDateStr)
      console.log('endDateStr: ' + endDateStr)
      return <UseExhibitiomTime startDate={startDateStr} endDate={startDateStr} />
    } else if (activeTab === '展品使用時間') {
      return <UseProductTime startDate={startDateStr} endDate={startDateStr} />
    } else if (activeTab === '熱門展品') {
      return <HotProduct startDate={startDateStr} endDate={startDateStr} />
    } else if (activeTab === '熱門展廳') {
      return <HotExhibition startDate={startDateStr} endDate={endDateStr} />
    } else if (activeTab === '註冊用戶') {
      return <Registered startDate={startDateStr} endDate={endDateStr} />
    } else if (activeTab === '進展人數') {
      return <Visitors startDate={startDateStr} endDate={endDateStr} />
    }
  }

  render () {
    const { startDate, endDate, startDateStr, endDateStr, dateError } = this.state
    const views = {
      query: {
        ids: 'ga:206321392'
      }
    }
    const CHARTS =
      {
        reportType: 'ga',
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:date',
          'start-date': startDateStr,
          'end-date': endDateStr,
          filters: 'ga:eventCategory==visitors'
        },
        chart: {
          type: 'TABLE',
          container: 'main-chart-container',
          options: {
            width: '100%'
          }
        }
      }
    return (
      <Container>
        <Box>
          <Content>
            <Columns>
              <Columns.Column size={3}>
                <Level.Side align='left'>
                  <Level.Item>
                    <strong>開始時間</strong>
                  </Level.Item>
                  <Level.Item>
                    <Form.Field kind='addons'>
                      <DatePicker
                        selected={startDate}
                        onChange={this.handleStartDateChange}
                        className='input'
                      />
                    </Form.Field>
                  </Level.Item>
                </Level.Side>
              </Columns.Column>
              <Columns.Column size={3}>
                <Level.Side align='left'>
                  <Level.Item>
                    <strong>開始時間</strong>
                  </Level.Item>
                  <Level.Item>
                    <Form.Field kind='addons'>
                      <DatePicker
                        selected={endDate}
                        onChange={this.handleEndDateChange}
                        className='input'
                      />
                    </Form.Field>
                  </Level.Item>
                </Level.Side>
              </Columns.Column>
              <Columns.Column size={2}>
                <Button renderAs='span' color='primary' onClick={this.onSearch}>確定</Button>
                {dateError ? (
                  <Tag color='danger' style={{ marginLeft: 20 }}>範圍選擇錯誤</Tag>
                ) : (
                  null
                )}
              </Columns.Column>
            </Columns>
          </Content>
        </Box>
        <Box>
          <Content activeTab={{ id: 'tab1' }} fullwidth>
            <Tabs
              tabList={tabList}
              activeTab={this.state.activeTab}
              changeActiveTab={this.changeActiveTab.bind(this)}
            />
            {startDateStr && endDateStr ? (
              // this.renderChart()
              <GoogleProvider accessToken='ya29.c.Kl66BzuiNz8NBO4fsW6oPGI7cHe2kOL3eUsxvw-Sr59qz3bIJimJ_krTRpjUaXl6MmuHtnRmeICrVGxU7EQfefx_iwodwoaialqrrnR2QnC_5HSElGdKXwFC8TIphKw6'>
                <GoogleDataChart views={views} config={CHARTS} />
              </GoogleProvider>
            ) : (
              <p>請選擇搜尋範圍</p>
            )}
          </Content>
        </Box>
      </Container>
    )
  }
}
export default Index
