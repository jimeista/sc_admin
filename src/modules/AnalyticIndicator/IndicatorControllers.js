import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Select, Button, Form } from 'antd'

import { postIndicator } from '../../features/indicator/indicatorSlice'

const { Option } = Select

const IndicatorControllers = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { dictionaries } = useSelector((state) => state.indicator)

  const onSubmit = async () => {
    let record = await form.validateFields()
    let client = { name: record.name, dictionaries: {} }
    let server = { name: record.name, dictionaries: [227] }

    Object.keys(record).forEach((key) => {
      if (key !== 'name' && key !== 'Отрасль') {
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

    console.log(client, server)
    // dispatch(postIndicator({ client, server }))
  }

  return (
    <Form form={form}>
      <Form.Item name={'name'}>
        <Input
          placeholder={'Введите название индикатора'}
          allowClear
          style={{ width: '30%' }}
        />
      </Form.Item>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {dictionaries_.map((name) => renderSelects(dictionaries, name))}
        <Button onClick={onSubmit}>Добавить</Button>
      </div>
    </Form>
  )
}

export default React.memo(IndicatorControllers)

const getDictionaryOptions = (data, key) => {
  if (data.status === 'success') {
    if (key === 'Отрасль') {
      let field = data.data.find((i) => i.name === 'Сфера')
      let strategy = data.data.find((i) => i.name === 'Стратегия 2050')

      return [
        ...field.options.map((o) => o.name),
        ...strategy.options.map((o) => o.name),
      ]
    }

    let dictionary = data.data.find((i) => i.name === key)
    return dictionary.options.map((o) => o.name)
  }
  return []
}

const renderSelects = (data, name) => {
  return (
    <Form.Item
      name={name}
      key={name}
      style={{ marginRight: 10, width: '32%' }}
      rules={[
        {
          required: true,
          message: `Выберите опцию`,
        },
      ]}
    >
      <Select placeholder={name} allowClear>
        {getDictionaryOptions(data, name).map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

const dictionaries_ = [
  'Государственная программа',
  'Единица измерения',
  'Источник информации',
  'Ответственный орган',
  'Отрасль',
  'Периодичность обновления',
  'Сфера',
]
