import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select

export const renderControllerSelects = (data, name) => {
  return (
    <Form.Item
      name={name}
      key={name}
      style={{ marginRight: 10, width: '32%' }}
      // rules={[
      //   {
      //     required: true,
      //     message: `Выберите опцию`,
      //   },
      // ]}
    >
      <Select
        placeholder={name === 'Стратегия 2050' ? 'Сфера' : name}
        allowClear
      >
        {getDictionaryOptions(data, name).map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

const getDictionaryOptions = (dictionaries, key) => {
  if (dictionaries.status === 'success') {
    if (key === 'Отрасль') {
      let field = dictionaries.data.find((i) => i.name === 'Сфера')
      let strategy = dictionaries.data.find((i) => i.name === 'Стратегия 2050')

      let arr = []

      field.options.forEach((i) => {
        arr = [...arr, ...i.options]
      })

      strategy.options.forEach((i) => {
        arr = [...arr, ...i.options]
      })

      return arr.map((i) => i.name)
    } else {
      let dictionary = dictionaries.data.find((i) => i.name === key)
      return dictionary.options.map((o) => o.name)
    }
  }
  return []
}

export const findOptionId = (dictionaries, key) => {
  //find option id logic
  //collect all options
  //find id on record key
  let fields = dictionaries.data.find((i) => i.name === 'Сфера').options
  let strategy = dictionaries.data.find((i) => i.name === 'Стратегия 2050')
    .options

  let options = []

  fields.forEach((i) => {
    options = [...options, ...i.options]
  })

  strategy.forEach((i) => {
    options = [...options, ...i.options]
  })

  let id = options.find((i) => i.name === key).id

  return id
}

export const dictionaries_ = [
  'Государственная программа',
  'Единица измерения',
  'Источник информации',
  'Ответственный орган',
  'Отрасль',
  'Периодичность обновления',
]
