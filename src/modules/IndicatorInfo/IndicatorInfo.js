import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'

import {
  getIndicatorInfo,
  getDictionaries,
} from '../../features/indicatorinfo/indicatorinfoSlice'

import IndicatorTable from './IndicatorTable'

const IndicatorInfo = () => {
  const dispatch = useDispatch()
  const { TabPane } = Tabs

  //главная страница загрузки показателей индикаторов
  //делаем get запрос списка справочника и индикатора при инициализации компоненты
  useEffect(() => {
    dispatch(getIndicatorInfo())
    dispatch(getDictionaries())
  }, [dispatch])

  //отрисовка переключения по табам показателей индикаторов
  return (
    <Tabs defaultActiveKey='1' tabPosition={'top'}>
      <TabPane tab='Аналитические индикаторы' key='1'>
        <IndicatorTable type={'Индикатор'} />
      </TabPane>
      <TabPane tab='Индикатор стратегии' key='2'>
        <IndicatorTable type={'Стратегия'} />
      </TabPane>
    </Tabs>
  )
}

export default withRouter(IndicatorInfo)
