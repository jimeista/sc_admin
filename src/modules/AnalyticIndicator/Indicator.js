import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'

import IndicatorTable from './IndicatorTable'
import IndicatorControllers from './IndicatorControllers'

import {
  getIndicator,
  getDictionaries,
} from '../../features/indicator/indicatorSlice'

const Indicator = () => {
  const dispatch = useDispatch()
  const { TabPane } = Tabs

  useEffect(() => {
    dispatch(getIndicator())
    dispatch(getDictionaries())
  }, [])

  return (
    <Tabs defaultActiveKey='1' tabPosition={'top'}>
      <TabPane tab='Панель администратора' key='1'>
        <IndicatorControllers />
        <IndicatorTable />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        dadas
      </TabPane>
    </Tabs>
  )
}

export default withRouter(Indicator)
