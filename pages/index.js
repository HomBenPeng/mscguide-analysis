import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import GAChart from '../components/GAChart'
import moment from 'moment'
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

  render () {
    const { startDate, endDate, startDateStr, endDateStr, dateError } = this.state
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
              <GAChart startDate={startDateStr} endDate={endDateStr} />
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
