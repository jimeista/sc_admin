import React, { useEffect, useContext } from 'react'
import { Form } from 'antd'

import { getAPI } from '../../utils/api'
import { AppContext } from '../../context/main'

import { Select, Search } from '../common'
import { DictionaryTable as Table } from './DictionaryTable'
import { Controllers } from './Controllers'

export const Dictionary = () => {
  const [form] = Form.useForm()

  const { setFetchedDictionaryData } = useContext(AppContext)

  useEffect(() => {
    getAPI('/sc-analytic-indicators/api/dictionaries').then((res) => {
      setFetchedDictionaryData({
        loading: false,
        data: res.data,
      })
    })
  }, [])

  return (
    <Form form={form}>
      <Form.Item
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '60%',
        }}
      >
        <div className='first_stage_filter'>
          <Select />
        </div>
      </Form.Item>
      <Controllers ant_form={form} />
      <Form.Item style={{ width: '60%', marginBottom: 10 }}>
        <Search style={{ width: '40%', margin: '5 0', marginRight: 8 }} />
      </Form.Item>
      <Form.Item>
        <Table />
      </Form.Item>
    </Form>
  )
}
