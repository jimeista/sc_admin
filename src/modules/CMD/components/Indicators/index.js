import React, { useEffect, useContext } from 'react'

import { AppContext } from '../../context/main'
import { getAPI } from '../../utils/api'

import { Controllers } from './Controllers'
import { Indicator, AdminTabs } from '../common'
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
        <Indicator />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        <Controllers isStrategy={true} />
        <Indicator isStrategy={true} />
      </TabPane>
    </AdminTabs>
  )
}
