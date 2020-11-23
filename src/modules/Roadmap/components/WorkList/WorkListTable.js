import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd'

import moment from 'moment'

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
  formValidate,
  setMapData,
  resetMapData,
} from '../../features/roadmap/roadmapSlice'

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
    return setWorkListTableColumnsHelper(
      organisations,
      categories,
      setVisible,
      setRecord
    )
  }, [organisations, categories, setVisible, setRecord])

  useEffect(() => {
    if (filtered) {
      if (editedId) {
        let item = dataSource.find((i) => i.id === editedId)
        // console.log('editing filtered data')
        setFiltered((state) => state.map((i) => (i.id === editedId ? item : i)))
        dispatch(setEditedId({ just_id: true }))
      }
      if (deletedId) {
        setFiltered((state) => state.filter((i) => i.id !== deletedId))
        dispatch(setDeletedId({ just_id: true }))
      }
    }
  }, [dataSource, deletedId, editedId, filtered])

  useMemo(() => {
    if (Object.keys(record).length > 0 && visible) {
      let ob = {
        ...record,
        'start-date': moment(record['start-date'], 'YYYY/MM/DD'),
        'end-date': moment(record['end-date'], 'YYYY/MM/DD'),
      }
      // console.log(ob)
      dispatch(formValidate(ob))
      let coordinates = record.geometries.coordinates
      coordinates.length > 0 &&
        dispatch(setMapData([{ coordinates, type: 'polygon' }]))
    }
  }, [record, visible, dispatch])

  useMemo(() => {
    // console.log('editing dataSource')
    setDataSource(setWorkListDataSourceHelper(data))
  }, [data])

  const onEdit = (record) => {
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
