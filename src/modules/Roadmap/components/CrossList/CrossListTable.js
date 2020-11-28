import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd'

import { setEditedId } from '../../../../features/roadmap/roadmapSlice'

import { CrossDetailsModal } from './CrossDetailsModal'
import { CustomTable as Table } from '../../../../common/Table'
import {
  setCrossListTableColumnsHelper,
  setCrossListDataSourceHelper,
} from '../../utils/table_helper'

export const CrossListTable = () => {
  const { categories, intersections, data, editedId } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  useEffect(() => {
    if (editedId && filtered) {
      let item = dataSource.find((i) => i.id === editedId)
      setFiltered((state) => state.map((i) => (i.id === editedId ? item : i)))
      dispatch(setEditedId({ just_id: false }))
    }
  }, [dataSource, editedId, filtered])

  const columns = useMemo(() => {
    return setCrossListTableColumnsHelper(
      setVisible,
      setRecord,
      intersections,
      categories
    )
  }, [setVisible, setRecord, intersections, categories])

  useMemo(() => {
    setDataSource(setCrossListDataSourceHelper(data, intersections))
  }, [data, intersections])

  const onEdit = (record) => {}

  const onDelete = (record) => {
    console.log(record)
    // dispatch(deleteRoadMap(record.id))
  }

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
      <Form.Item name={'search'}>
        <Input
          allowClear
          placeholder={'Поиск по улице'}
          onChange={onSearch}
          style={{ width: 300 }}
        />
      </Form.Item>
      <Form.Item name='table'>
        <Table
          columns={columns}
          data={filtered ? filtered : dataSource}
          setData={setDataSource}
          handleEdit={onEdit}
          handleDelete={onDelete}
          loading={intersections.status !== 'success' ? true : false}
          isDeletable={true}
        />
      </Form.Item>
      {visible && (
        <Form.Item name='modal'>
          <CrossDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
            data={data}
          />
        </Form.Item>
      )}
    </Form>
  )
}
