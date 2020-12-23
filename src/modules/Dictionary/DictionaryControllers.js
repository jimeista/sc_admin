import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Space, Form } from 'antd'

import { setSelected } from '../../features/dictionary/dictionarySlice'
import DictionaryForm from './DictionaryForm'

const { Option } = Select

const DictionaryControllers = () => {
  const { data, status } = useSelector((state) => state.dictionary)
  const [dictionaries, setDictionaries] = useState([])

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'success') {
      setDictionaries([
        'Все справочники',
        ...data.filter((i) => i.name !== 'Тип').map((i) => i.name),
      ])
    }
  }, [data, status])

  const onChange = (value) => {
    dispatch(setSelected(value))
  }

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <Select
        style={{ width: '30%', margin: '15px 0' }}
        placeholder={'Справочники'}
        onChange={onChange}
      >
        {dictionaries.sort().map((option, index) => (
          <Option value={option} key={`${option}-${index}`}>
            {option}
          </Option>
        ))}
      </Select>
      <Form form={form} style={{ display: 'flex', marginBottom: 40 }}>
        <DictionaryForm form={form} />
      </Form>
    </Space>
  )
}

export default React.memo(DictionaryControllers)
