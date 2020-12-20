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

      return [
        ...field.options.map((o) => o.name),
        ...strategy.options.map((o) => o.name),
      ]
    } else {
      let dictionary = dictionaries.data.find((i) => i.name === key)
      return dictionary.options.map((o) => o.name)
    }
  }
  return []
}

export const dictionaries_ = [
  'Государственная программа',
  'Единица измерения',
  'Источник информации',
  'Ответственный орган',
  'Отрасль',
  'Периодичность обновления',
]
