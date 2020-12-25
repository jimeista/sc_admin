import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Space } from 'antd'

import { getDictionaries } from '../../features/dictionary/dictionarySlice'

import DictionaryTable from './DictionaryTable'
import DictionaryControllers from './DictionaryControllers'

const Dictionary = () => {
  const dispatch = useDispatch()

  //главная страница загрузки компоненты "Справочники"
  //делаем запрос списка справочников при инициализации компоненты
  useEffect(() => {
    dispatch(getDictionaries())
  }, [dispatch])

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <DictionaryControllers />
      <DictionaryTable />
    </Space>
  )
}

export default React.memo(Dictionary)
