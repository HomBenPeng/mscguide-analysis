import React, { useState } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
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

const Tabs = (props) => {
  return (
    <div className='tabs is-centered is-boxed'>
      <ul>
        {tabList.map(tab =>
          <Tab
            tab={tab}
            key={tab.name}
            activeTab={props.activeTab}
            changeActiveTab={props.changeActiveTab}
          />
        )}
      </ul>
    </div>
  )
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('展廳停留時間')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startDateStr, setStartDateStr] = useState('')
  const [endDateStr, setEndDateStr] = useState('')
  const [dateError, setDateError] = useState(false)

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }

  const changeActiveTab = (tab) => {
    setActiveTab(tab)
  }

  const onSearch = () => {
    const startTime = startDate.getTime()
    const endTime = endDate.getTime()
    if (endTime > startTime) {
      setStartDateStr(moment(startDate).format('YYYY-MM-DD'))
      setEndDateStr(moment(startDate).format('YYYY-MM-DD'))
      setDateError(false)
    } else {
      setDateError(true)
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
                      onChange={handleStartDateChange}
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
                      onChange={handleEndDateChange}
                      className='input'
                    />
                  </Form.Field>
                </Level.Item>
              </Level.Side>
            </Columns.Column>
            <Columns.Column size={2}>
              <Button renderAs='span' color='primary' onClick={() => onSearch()}>確定</Button>
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
            activeTab={activeTab}
            changeActiveTab={changeActiveTab}
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
export default Index
