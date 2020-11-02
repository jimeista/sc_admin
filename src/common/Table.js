import React, { useState } from 'react'
import { Table, Popconfirm, Form, Space } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import { EditableCell } from './EditableCell'

export const CustomTable = (props) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')

  const arr = [
    ...props.columns,
    {
      title: 'Действие',
      dataIndex: '',
      key: 'x',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined className='icon_edit_btn_style' title='Сохранить' />
            </a>
            <Popconfirm
              title='Вы уверены что хотите оменить изменения?'
              onConfirm={cancel}
            >
              <CloseOutlined className='icon_edit_btn_style' title='Отменить' />
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <a
              disabled={editingKey !== ''}
              onClick={() => edit(record, form, setEditingKey)}
            >
              <EditOutlined
                className='icon_edit_btn_style'
                title='Редактировать'
              />
            </a>
            <Popconfirm
              title='Вы уверены что хотите удалить даныне?'
              onConfirm={() => handleDelete(record)}
            >
              <DeleteOutlined className='icon_edit_btn_style' title='Удалить' />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...props.data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        props.setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        props.setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const handleDelete = async (record) => {
    try {
      let newData = [...props.data]
      props.setData(newData.filter((item) => item.key !== record.key))
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const mergedColumns = arr.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.type,
        dataIndex: col.dataIndex,
        title: col.title,
        data: col.data,
        placeholder: col.placeholder,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={props.data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}
