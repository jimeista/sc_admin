import React, { useState } from 'react'
import { Table, Popconfirm, Form, Space } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import { EditableCell } from './EditableCell'

// таблица обертка
export const CustomTable = (props) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('') //редактируемая строка

  //дополняем колонки таблицы кнопками действия
  const arr = [
    ...props.columns,
    {
      title: 'Действие',
      dataIndex: '',
      width: '5%',
      align: 'center',
      key: 'x',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          // кнопки отмены и сохранения редактирования
          <span>
            <a
              onClick={() => onSave(record)} //передаем сохранненые изменения
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
          // кнопки удаления и редактирования
          <Space>
            <a
              disabled={editingKey !== '' || !props.isEditable}
              onClick={() => edit(record, form, setEditingKey)}
            >
              <EditOutlined
                className='icon_edit_btn_style'
                title='Редактировать'
              />
            </a>
            <Popconfirm
              disabled={!props.isDeletable}
              title='Вы уверены что хотите удалить даныне?'
              onConfirm={() => onDelete(record)}
            >
              <DeleteOutlined className='icon_edit_btn_style' title='Удалить' />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  // обозначаем редактируемую строку
  const isEditing = (record) => record.key === editingKey

  //передаем данные в форму таблицы
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  //сбрасываем редактируемость строки
  const cancel = () => {
    setEditingKey('')
  }

  // сохраняем данные редактирования
  const onSave = async (record) => {
    try {
      const row = await form.validateFields()

      // производим клиентское обновление страницы
      const newData = [...props.data]
      const index = newData.findIndex((item) => record.key === item.key)
      const item = newData[index]

      // newData.splice(index, 1, { ...item, ...row })
      // props.setData(newData)

      // передаем данные для post put запроса
      props.handleEdit({ ...item, ...row, record })
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  // удаляем данные
  const onDelete = async (record) => {
    try {
      // let newData = [...props.data]
      // props.setData(newData.filter((item) => item.key !== record.key))

      // передаем данные для delete запроса
      props.handleDelete(record)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  // подгоняем колонки таблицы в редактируемую оболочку согласно antd table api
  const mergedColumns = arr.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record, //данные строки
        inputType: col.type, // тип редактируемого элемента
        dataIndex: col.dataIndex,
        title: col.title,
        data: col.data, //данные для отобрадения при редактировании
        placeholder: col.placeholder,
        editing: isEditing(record), //состояние редактируемости
      }),
    }
  })

  // ant таблица
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
        // expandable={{
        //   defaultExpandAllRows: true,
        // }}
        loading={props.loading}
        locale={{
          filterTitle: 'Меню фильтра',
          filterConfirm: 'Ок',
          filterReset: 'Сбросить',
          filterEmptyText: 'Нет фильтров',
          selectAll: 'Выбрать текущую страницу',
          selectInvert: 'Invert current page',
          selectionAll: 'Выбрать все',
          sortTitle: 'Сортировать',
          expand: 'Expand row',
          collapse: 'Collapse row',
          triggerDesc: 'Сортировать по убыванию',
          triggerAsc: 'Сортировать по возрастанию',
          cancelSort: 'Отменить сортировку',
        }}
      />
    </Form>
  )
}
