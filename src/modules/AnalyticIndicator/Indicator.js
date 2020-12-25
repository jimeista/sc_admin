import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'

import IndicatorTable from './IndicatorTable'
import IndicatorControllers from './IndicatorControllers'
import StrategyTable from './StrategyTable'

import {
  getIndicator,
  getDictionaries,
} from '../../features/indicator/indicatorSlice'

const Indicator = () => {
  const dispatch = useDispatch()
  const { TabPane } = Tabs

  //главная страница загрузки индикаторов
  //делаем get запрос списка справочника и индикатора при инициализации компоненты
  useEffect(() => {
    dispatch(getIndicator())
    dispatch(getDictionaries())
  }, [dispatch])

  return (
    <Tabs defaultActiveKey='1' tabPosition={'top'}>
      <TabPane tab='Аналитические индикаторы' key='1'>
        <IndicatorControllers dictionary={'Сфера'} />
        <IndicatorTable />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        <IndicatorControllers dictionary={'Стратегия 2050'} />
        <StrategyTable />
      </TabPane>
    </Tabs>
  )
}

export default withRouter(Indicator)