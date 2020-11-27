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
  setDeletedId,
} from '../../../../features/roadmap/roadmapSlice'

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

  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  const columns = useMemo(() => {
    //TASK: set table columns labeling and operations
    //LOGIC:pass filters' options and track popup visible state user click on id
    //set row records on click
    return setWorkListTableColumnsHelper(
      organisations,
      categories,
      setVisible,
      setRecord
    )
  }, [organisations, categories, setVisible, setRecord])

  useEffect(() => {
    //TASK:show changes made on filtered table's row after put || delete requests
    //LOGIC:check if user still remains on filtered data
    //if so, update filtered state data and set id null on redux store for further checkups
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
  }, [dataSource, deletedId, editedId, filtered])

  useMemo(() => {
    // TASK: set table data
    //LOGIC: pass data to adjust data to ant table's dataSource format
    setDataSource(setWorkListDataSourceHelper(data))
  }, [data])

  const onEdit = (record) => {
    //TASK: edit record
    //LOGIC: request edit on redux side
    dispatch(
      putRoadMap({
        reedit: false,
        data: {
          percentage: record.percentage,
        },
        id: record.id,
      })
    )
  }

  const onDelete = (record) => {
    //TASK: delete record
    //LOGIC: request delete on redux side
    dispatch(deleteRoadMap(record.id))
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

        return i.id.toString().includes(e.target.value.toLowerCase())
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
          loading={status === 'loading' ? true : false}
          isEditable={true}
          isDeletable={true}
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
