import React, { useState, useContext, useEffect } from 'react'
import { Table, Form, Space, Popconfirm } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { AppContext } from '../../context/main'
import { getAPI, deleteAPI } from '../../utils/api'

import { EditableCell } from './EditableCell'

export const AdminTable = ({
  cols,
  data,
  loading,
  url,
  url2,
  setFetchedData,
  save,
  isLink,
}) => {
  const { searchText } = useContext(AppContext)
  const [filtered, setFiltered] = useState()
  const [editingKey, setEditingKey] = useState('')

  const [form] = Form.useForm()

  useEffect(() => {
    if (data && searchText) {
      setFiltered(
        data.filter((item) => {
          let obb =
            item.children &&
            item.children.some((ob) => {
              const isNestedFilter = ob.key
                .toLowerCase()
                .includes(searchText.toLowerCase())
              return isNestedFilter
            })

          const isFilter = item.key
            .toLowerCase()
            .includes(searchText.toLowerCase())
          return obb ? obb : isFilter
        })
      )
    }
  }, [data, searchText])

  const isEditing = (record) => record.key === editingKey

  const edit = (record, form, setEditingKey) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const arr = isLink
    ? cols
    : [
        ...cols,
        {
          title: 'Действие',
          dataIndex: '',
          key: 'x',
          render: (_, record) => {
            const editable = isEditing(record)
            return editable ? (
              <span>
                <a
                  onClick={() => save(record, form, setEditingKey)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  <SaveOutlined
                    className='icon_edit_btn_style'
                    title='Сохранить'
                  />
                </a>
                <Popconfirm
                  title='Вы уверены что хотите оменить изменения?'
                  onConfirm={cancel}
                >
                  <CloseOutlined
                    className='icon_edit_btn_style'
                    title='Отменить'
                  />
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
                  onConfirm={() => handleDelete(record.id)}
                >
                  <DeleteOutlined
                    className='icon_edit_btn_style'
                    title='Удалить'
                  />
                </Popconfirm>
              </Space>
            )
          },
        },
      ]

  cols = cols[0].title === 'Все справочники' ? cols : arr

  const handleDelete = (id) => {
    deleteAPI(`${url}/${id}`).then((res) =>
      getAPI(url2 ? url2 : url)
        .then((res) =>
          setFetchedData({
            loading: false,
            data: res.data,
          })
        )
        .catch((err) => console.log(err))
    )
  }

  const mergedColumns = cols.map((col, index) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          setIndicator: col.setIndicator,
          inputType: col.type,
          dataIndex: col.dataIndex,
          title: col.title,
          data: col.data,
          editing: isEditing(record),
          callBack: col.callBack,
        }
      },
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
        columns={mergedColumns}
        dataSource={searchText ? filtered : data}
        loading={loading}
        pagination={{
          pageSizeOptions: ['10', '20', '25', '30'],
          showSizeChanger: true,
          locale: { items_per_page: '' },
          onChange: cancel,
        }}
        className='AdminTable_style'
      />
    </Form>
  )
}
