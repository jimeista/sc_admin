import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd'

import {
  setDeletedIntersectionId,
  deleteIntersection,
} from '../../../../features/roadmap/roadmapSlice'
import {
  setCrossListTableColumnsHelper,
  setCrossListDataSourceHelper,
} from '../../utils/table_helper'

import { CrossDetailsModal } from './CrossDetailsModal'
import { CustomTable as Table } from '../../../../common/Table'

//отрисовка таблицы по пересечению работ
export const CrossListTable = () => {
  const {
    categories,
    intersections,
    data,
    deletedIntersectionId,
    intersectionsMapData,
  } = useSelector((state) => state.roadmap)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false) //состояние модального для отображение информации по пересечению
  const [record, setRecord] = useState({}) //данные по работам отправляющиеся на модальное окно
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  useEffect(() => {
    //обновение после удалении данных если пользователь использует поисковик
    if (filtered && deletedIntersectionId) {
      setFiltered((state) =>
        state.filter((i) => i.id !== deletedIntersectionId)
      )
      dispatch(setDeletedIntersectionId())
    }
  }, [dataSource, deletedIntersectionId, filtered])

  //инициализация своиства ant table dataSource
  useMemo(() => {
    setDataSource(setCrossListDataSourceHelper(data, intersections))
  }, [data, intersections])

  //инициализация своиства ant table columns
  const columns = useMemo(() => {
    return setCrossListTableColumnsHelper(
      setVisible,
      setRecord,
      intersections,
      categories
    )
  }, [setVisible, setRecord, intersections, categories])

  //реализация удаление данных с таблицы
  const onDelete = (record) => {
    dispatch(deleteIntersection(record.id))
  }

  //реализация поиска данных по таблице
  //поиск данных по id пересечения и id работ
  const onSearch = (e) => {
    setFiltered(
      dataSource.filter((i) => {
        if (
          i.address &&
          i.address.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true
        }

        let isIncluded = false
        i.ids.forEach((id) => {
          if (id.toString().includes(e.target.value.toLowerCase())) {
            isIncluded = true
          }
        })
        return isIncluded
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
          handleDelete={onDelete}
          loading={intersections.status !== 'success' ? true : false}
          isDeletable={true}
        />
      </Form.Item>
      {/* модальное окно отображения информации по пересечению работ */}
      {visible && (
        <Form.Item name='modal'>
          <CrossDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
            data={data}
            intersectionsMapData={intersectionsMapData}
          />
        </Form.Item>
      )}
    </Form>
  )
}
