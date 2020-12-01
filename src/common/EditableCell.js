import React from 'react'
import { Input, InputNumber, Form, Select, Tag } from 'antd'

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
  notRequired,
  ...restProps
}) => {
  const { Option } = Select

  const switchCase = (type) => {
    switch (type) {
      case 'select':
        return (
          <Select placeholder={placeholder} allowClear>
            {data.map((value) => (
              <Option key={`${value}- ${placeholder}`} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        )

      case 'multi-select':
        function tagRender(props) {
          const { label, closable, onClose } = props

          return (
            <Tag
              closable={closable}
              onClose={onClose}
              style={{ marginRight: 3 }}
            >
              {label}
            </Tag>
          )
        }
        return (
          <Select
            placeholder='Модули'
            mode='multiple'
            tagRender={tagRender}
            style={{ width: '100%', marginBottom: 15 }}
            options={data}
          />
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
      default:
        return (
          <Input
            className='Edit_input_style'
            placeholder={placeholder}
            allowClear
          />
        )
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
              required: notRequired ? notRequired : true,
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
