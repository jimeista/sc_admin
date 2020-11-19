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
  deleteRoadMap,
  putRoadMap,
  setEditedId,
} from '../../features/roadmap/roadmapSlice'

export const WorkListTable = () => {
  const { organisations, categories, status, data, editedId } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  const columns = useMemo(() => {
    return setWorkListTableColumnsHelper(
      organisations,
      categories,
      setVisible,
      setRecord
    )
  }, [organisations, categories, setVisible, setRecord])

  useEffect(() => {
    if (editedId && filtered) {
      let item = dataSource.find((i) => i.id === editedId)
      console.log('editing filtered data')
      setFiltered((state) => state.map((i) => (i.id === editedId ? item : i)))
      dispatch(setEditedId({ just_id: true }))
    }
  }, [dataSource, editedId, filtered])

  useMemo(() => {
    console.log('editing dataSource')
    setDataSource(setWorkListDataSourceHelper(data))
  }, [data])

  const onEdit = (record) => {
    dispatch(
      putRoadMap({
        status: {
          percentage: record.percentage,
        },
        id: record.id,
      })
    )
  }

  const onDelete = (record) => {
    dispatch(deleteRoadMap(record.id))
  }

  const onSearch = (e) => {
    setFiltered(
      dataSource.filter(
        (i) =>
          i.address &&
          i.address.toLowerCase().includes(e.target.value.toLowerCase())
      )
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
          loading={status === 'loading' ? true : false}
        />
      </Form.Item>
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
