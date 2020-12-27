import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd'

import { WorkDetailsModal } from './WorkDetailsModal'
import { CustomTable as Table } from '../../../../common/Table'
import {
  setWorkListTableColumnsHelper,
  setWorkListDataSourceHelper,
} from '../../utils/table_helper'
import {
  deleteRoadmap,
  putRoadmap,
  setEditedId,
  setDeletedId,
} from '../../../../features/roadmap/roadmapSlice'

//отрисовка таблицы по ремонту дорог
export const WorkListTable = () => {
  const {
    organisations,
    categories,
    status,
    data,
    editedId,
    deletedId,
  } = useSelector((state) => state.roadmap)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false) //состояние модального окна которая открывается при клике на id работы
  const [record, setRecord] = useState({}) //данные работы которые передаются в модальное окно
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  //инициализация своиства ant table columns
  const columns = useMemo(() => {
    return setWorkListTableColumnsHelper(
      organisations,
      categories,
      setVisible,
      setRecord
    )
  }, [organisations, categories, setVisible, setRecord])

  useEffect(() => {
    //обновение после редактирование или удалении данных если пользователь использует поисковик
    if (filtered) {
      if (editedId) {
        let item = dataSource.find((i) => i.id === editedId)
        setFiltered((state) => state.map((i) => (i.id === editedId ? item : i)))
        dispatch(setEditedId())
      }
      if (deletedId) {
        setFiltered((state) => state.filter((i) => i.id !== deletedId))
        dispatch(setDeletedId())
      }
    }
  }, [dataSource, deletedId, editedId, filtered, dispatch])

  //инициализация своиства ant table dataSource
  useMemo(() => {
    setDataSource(setWorkListDataSourceHelper(data))
  }, [data])

  //реализация редактирования данных с таблицы
  const onEdit = (record) => {
    dispatch(
      putRoadmap({
        reedit: false,
        data: {
          percentage: record.percentage,
        },
        id: record.id,
      })
    )
  }

  //реализация удаление данных с таблицы
  const onDelete = (record) => {
    dispatch(deleteRoadmap(record.id))
  }

  //реализация поиска данных по таблице
  const onSearch = (e) => {
    setFiltered(
      dataSource.filter((i) => {
        if (
          i.address &&
          i.address.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true
        }

        return i.id.toString().includes(e.target.value.toLowerCase())
      })
    )
  }

  return (
    <Form form={form}>
      {/* поисковик */}
      <Form.Item name={'search'}>
        <Input
          allowClear
          placeholder={'Поиск по улице'}
          onChange={onSearch}
          style={{ width: 300 }}
        />
      </Form.Item>
      {/* таблица */}
      <Form.Item name='table'>
        <Table
          columns={columns}
          data={filtered ? filtered : dataSource}
          setData={setDataSource}
          handleEdit={onEdit}
          handleDelete={onDelete}
          loading={status === 'loading' ? true : false}
          isEditable={true}
          isDeletable={true}
        />
      </Form.Item>
      {/* модальное окно по выбранной работе */}
      {visible && (
        <Form.Item name='modal'>
          <WorkDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
          />
        </Form.Item>
      )}
    </Form>
  )
}
