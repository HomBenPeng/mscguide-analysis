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

const Tabs = () => {
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

const Index = () => {
  return (
    <div>
      <Button color='primary'>My Bulma button</Button>
    </div>
  )
}
export default Index
