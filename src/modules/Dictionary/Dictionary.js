import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Space } from 'antd'

import { getDictionaries } from '../../features/dictionary/dictionarySlice'

import DictionaryTable from './DictionaryTable'
import DictionaryControllers from './DictionaryControllers'

const Dictionary = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('fetching ..')
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
