import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'

import IndicatorinfoTable from './IndicatorinfoTable'
import StrategyinfoTable from './StrategyinfoTable'

import {
  getIndicatorInfo,
  getDictionaries,
} from '../../features/indicatorinfo/indicatorinfoSlice'

const IndicatorInfo = () => {
  const dispatch = useDispatch()
  const { TabPane } = Tabs

  useEffect(() => {
    dispatch(getIndicatorInfo())
    dispatch(getDictionaries())
  }, [])

  return (
    <Tabs defaultActiveKey='1' tabPosition={'top'}>
      <TabPane tab='Аналитические индикаторы' key='1'>
        <IndicatorinfoTable />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        <StrategyinfoTable />
      </TabPane>
    </Tabs>
  )
}

export default withRouter(IndicatorInfo)
