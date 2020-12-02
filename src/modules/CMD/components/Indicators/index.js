import React, { useEffect, useContext } from 'react'

import { AppContext } from '../../context/main'
import { getAPI } from '../../utils/api'

import { Controllers } from './Controllers'
import { Indicator, AdminTabs, Search } from '../common'
import { Tabs } from 'antd'

export const Indicators = () => {
  const { TabPane } = Tabs

  const { fetchedDictionaryData, setFetchedDictionaryData } = useContext(
    AppContext
  )

  useEffect(() => {
    if (!fetchedDictionaryData.data) {
      getAPI('/sc-analytic-indicators/api/dictionaries').then((res) => {
        setFetchedDictionaryData({
          loading: false,
          data: res.data,
        })
      })
    }
  }, [])

  return (
    <AdminTabs position={'top'}>
      <TabPane tab='Панель администратора' key='1'>
        <Controllers />
        <div style={{ width: '60%', margin: '20px 0' }}>
          <Search placeholder={'Поиск по индикаторам'} />
        </div>
        <Indicator />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        <Controllers isStrategy={true} />
        <div style={{ width: '60%', margin: '20px 0' }}>
          <Search placeholder={'Поиск по индикаторам'} />
        </div>
        <Indicator isStrategy={true} />
      </TabPane>
    </AdminTabs>
  )
}
