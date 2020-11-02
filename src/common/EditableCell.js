import React from 'react'
import { Input, Form, Select, Tag } from 'antd'

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
      case 'multi-select':
        function tagRender(props) {
          const { label, closable, onClose, abr } = props

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
              required: true,
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
