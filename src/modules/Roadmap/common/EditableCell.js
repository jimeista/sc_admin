import React from 'react'
import { Input, Form, Select, InputNumber, DatePicker } from 'antd'
import moment from 'moment'

export const EditableCell = ({
  editing,
  dataIndex,
  placeholder,
  title,
  data,
  inputType,
  record,
  index,
  children,
  required,
  ...restProps
}) => {
  const { Option } = Select

  const switchCase = (type) => {
    switch (type) {
      case 'select':
        return (
          <Select placeholder={placeholder} allowClear>
            {data.map((role) => (
              <Option key={`${role}- ${placeholder}`} value={role}>
                {role}
              </Option>
            ))}
          </Select>
        )
      case 'number':
        return (
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace('%', '')}
          />
        )
      case 'picker':
        return (
          <DatePicker
            placeholder='Выбрать дату'
            format='YYYY/MM/DD'
            value={moment('2020/01/01', 'YYYY/MM/DD')}
            // format={picker ? 'YYYY' : 'YYYY-MM-DD'}
            // picker={picker}
          />
        )
      default:
        return <Input className='Edit_input_style' />
    }
  }

  const inputNode = switchCase(inputType)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required,
              message: `Введите ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
