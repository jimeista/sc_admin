import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button, Form } from 'antd'

import {
  renderControllerSelects,
  dictionaries_,
} from '../../utils/indicator_helper'
import { postIndicator } from '../../features/indicator/indicatorSlice'

const StrategyControllers = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { dictionaries } = useSelector((state) => state.indicator)

  const onSubmit = async () => {
    let record = await form.validateFields()
    let client = { name: record.name, dictionaries: {} }
    let server = { name: record.name, dictionaries: [227] }

    Object.keys(record).forEach((key) => {
      if (key !== 'name' && key !== 'Отрасль' && record[key] !== undefined) {
        //prepare for client
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //prepare for server post
        let dictionary = dictionaries.data.find((i) => i.name === key)
        let id = dictionary.options.find((o) => o.name === record[key]).id

        server = { ...server, dictionaries: [...server.dictionaries, id] }
      }
    })

    // console.log(client, server)
    dispatch(postIndicator({ client, server }))
    form.resetFields()
  }

  return (
    <Form form={form} style={{ margin: '30px auto' }}>
      <Form.Item name={'name'}>
        <Input
          placeholder={'Введите название индикатора'}
          allowClear
          style={{ width: '30%' }}
        />
      </Form.Item>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {[...dictionaries_, 'Стратегия 2050'].map((name) =>
          renderControllerSelects(dictionaries, name)
        )}
        <Button onClick={onSubmit}>Добавить</Button>
      </div>
    </Form>
  )
}

export default React.memo(StrategyControllers)
