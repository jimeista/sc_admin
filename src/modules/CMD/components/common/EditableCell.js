import React from 'react'

import { Form, Input, InputNumber, Select } from 'antd'

export const EditableCell = ({
  data,
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  const switchCase = (type) => {
    switch (type) {
      case 'select':
        return (
          <Select placeholder='Выбрать значение' allowClear>
            {data &&
              data.map((item) => (
                <Select.Option
                  key={`${item.title}-${item.id}`}
                  value={item.title}
                >
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        )
      case 'number':
        return <InputNumber className='Edit_input_style' />
      default:
        return <Input className='Edit_input_style' />
    }
  }

  const inputNode = switchCase(inputType)

  return (
    <td {...restProps} className='Table_td_style_line'>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={
            inputType !== 'select' &&
            inputType !== 'date' &&
            inputType !== 'number' && [
              {
                required: true,
                message: `это поле необходимо заполнить!`,
              },
            ]
          }
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
