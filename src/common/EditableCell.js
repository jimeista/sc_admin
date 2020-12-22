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
  ...restProps
}) => {
  const { Option } = Select

  const switchCase = (type) => {
    switch (type) {
      case 'select':
        return (
          <Select placeholder={placeholder} allowClear>
            {data.map((i) => {
              return (
                <Option key={`${i.value}-${placeholder}`} value={i.value}>
                  {i.value}
                </Option>
              )
            })}
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
      case 'planfact':
        return <InputNumber min={0} />
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
              required: dictionaries.includes(title) ? false : true,
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

const dictionaries = [
  'Государственная программа',
  'Единица измерения',
  'Ответственный орган',
  'Источник информации',
  'Отрасль',
  'Периодичность обновления',
  'Сфера',
]
